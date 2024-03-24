import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import type { CustomerOrder, OrderStatus } from '../api/types';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { formatDate } from '@/utils/date';

type Props = { order: CustomerOrder };

const ORDER_ITEM_IMAGE_SIZE = 120;

export const OrderListItem = ({ order }: Props) => {
  const firstLineItem = order.lineItems.edges[0]?.node;
  const firstFulfillment = order.fulfillments.edges[0]?.node;

  const navigation = useNavigation();

  let orderStatus: OrderStatus = 'CONFIRMED';
  if (firstFulfillment) {
    orderStatus = firstFulfillment.latestShipmentStatus;
  }

  let orderItemsLength = 0;
  for (const lineItemEdge of order.lineItems.edges) {
    orderItemsLength += lineItemEdge.node.quantity;
  }

  return (
    <PressableOpacity
      onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
    >
      <Box flexDirection="row" alignItems="flex-start" g="m" p="m">
        <Image
          source={firstLineItem?.image?.url}
          style={{
            width: ORDER_ITEM_IMAGE_SIZE,
            height: ORDER_ITEM_IMAGE_SIZE,
          }}
        />

        <Box flex={1} g="s">
          <Text variant="h3">Order {order.name}</Text>

          <Box flexDirection="row" alignItems="center">
            <Text fontWeight="600">{orderStatus}</Text>
            <Text> - {formatDate(order.processedAt)}</Text>
          </Box>

          <Text>
            {orderItemsLength} ITEM{orderItemsLength > 1 ? 'S' : ''}
          </Text>

          <Text fontWeight="600">${order.totalPrice.amount}</Text>
        </Box>
      </Box>
    </PressableOpacity>
  );
};
