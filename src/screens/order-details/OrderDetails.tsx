import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { useOrderDetails } from './api/useOrderDetails';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';

export const OrderDetails = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
  const { orderId } = route.params;

  const { data: order, isLoading } = useOrderDetails(orderId);

  if (isLoading) return <Loading height="100%" />;

  if (!order) return null;

  return (
    <ScrollView>
      <Box p="m">
        <Text variant="h3">Order {order.name}</Text>
      </Box>
    </ScrollView>
  );
};
