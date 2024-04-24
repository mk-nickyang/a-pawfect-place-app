import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { useOrderDetails } from '../api/useOrderDetails';
import { getOrderStatus } from '../api/utils';
import { OrderTimeline } from '../components/OrderTimeline';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';
import { formatDate } from '@/utils/date';

export const OrderDetails = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
  const { orderId } = route.params;

  const { data: order, isLoading } = useOrderDetails(orderId);

  if (isLoading) return <Loading height="100%" />;

  if (!order) return null;

  const orderStatus = getOrderStatus(order.fulfillments);

  return (
    <ScrollView>
      <Box p="m">
        <Text variant="h3" mb="s">
          Order {order.name}
        </Text>

        <Text color="contentSecondary" fontWeight="600">
          <Text style={styles.orderStatus}>{orderStatus}</Text>{' '}
          {formatDate(order.processedAt)}
        </Text>

        <OrderTimeline order={order} />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderStatus: {
    textTransform: 'capitalize',
  },
});
