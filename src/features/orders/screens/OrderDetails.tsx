import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { openBrowserAsync } from 'expo-web-browser';
import { ScrollView, StyleSheet } from 'react-native';

import { useOrderDetails } from '../api/useOrderDetails';
import { getOrderStatus } from '../api/utils';
import { OrderDetailsLineItem } from '../components/OrderDetailsLineItem';
import { OrderDetailsPayment } from '../components/OrderDetailsPayment';
import { ORDER_STATUS_MESSAGE } from '../utils/constants';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';
import { formatPrice } from '@/utils/currency';
import { formatDate } from '@/utils/date';

export const OrderDetails = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
  const { orderId } = route.params;

  const { data: order, isLoading } = useOrderDetails(orderId);

  if (isLoading) return <Loading height="100%" />;

  if (!order) return null;

  const { status, updatedAt } = getOrderStatus(order);

  const tracking = order.fulfillments.edges[0]?.node.trackingInformation?.[0];
  const paymentTransaction = order.transactions?.[0];
  const shippingMethod = order.shippingLine?.title;
  const refundAmount = formatPrice(order.refunds?.[0]?.totalRefunded);

  return (
    <ScrollView>
      <Box p="m" mb="m" g="s" backgroundColor="mainBackground">
        <Text variant="h3">Order {order.name}</Text>

        <Text color="contentSecondary" fontWeight="600">
          <Text style={styles.orderStatus}>{status}</Text> on{' '}
          {formatDate(updatedAt)}
        </Text>

        <Text>{ORDER_STATUS_MESSAGE[status]}</Text>

        {tracking ? (
          <Box>
            <Text>{tracking.company} tracking number:</Text>
            <PressableOpacity onPress={() => openBrowserAsync(tracking.url)}>
              <Text fontWeight="600" textDecorationLine="underline">
                {tracking.number}
              </Text>
            </PressableOpacity>
          </Box>
        ) : null}
      </Box>

      {order.lineItems?.edges.length ? (
        <Box p="m" mb="m" g="s" backgroundColor="mainBackground">
          <Text fontWeight="600">Order Summary</Text>

          <Box my="s" g="m">
            {order.lineItems.edges.map(({ node: lineItem }) => (
              <OrderDetailsLineItem key={lineItem.id} lineItem={lineItem} />
            ))}
          </Box>

          {order.note ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="contentSecondary">Note</Text>
              <Text style={styles.note}>{order.note}</Text>
            </Box>
          ) : null}

          {order.totalShipping?.amount ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="contentSecondary">Shipping</Text>
              <Text>
                {Number(order.totalShipping.amount) === 0
                  ? 'Free'
                  : formatPrice(order.totalShipping)}
              </Text>
            </Box>
          ) : null}

          {refundAmount ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="contentSecondary">Refunded</Text>
              <Text>-{refundAmount}</Text>
            </Box>
          ) : null}

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="contentSecondary">Total</Text>
            <Text variant="h3">
              {formatPrice(order.totalPrice, { currencyCode: true })}
            </Text>
          </Box>
        </Box>
      ) : null}

      <Box px="m" pt="m" pb="l" g="m" backgroundColor="mainBackground">
        <Box>
          <Text color="contentSecondary">Shipping address</Text>
          <Text>{order.shippingAddress?.name}</Text>
          <Text>{order.shippingAddress?.formatted.join(', ')}</Text>
        </Box>

        <Box>
          <Text color="contentSecondary">Billing address</Text>
          <Text>{order.billingAddress?.name}</Text>
          <Text>{order.billingAddress?.formatted.join(', ')}</Text>
        </Box>

        <Box>
          <Text color="contentSecondary">Payment</Text>
          {paymentTransaction ? (
            <OrderDetailsPayment transaction={paymentTransaction} />
          ) : null}
        </Box>

        <Box>
          <Text color="contentSecondary">Shipping method</Text>
          <Text>{shippingMethod}</Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderStatus: {
    textTransform: 'capitalize',
  },
  note: {
    flex: 1,
    maxWidth: '80%',
  },
});
