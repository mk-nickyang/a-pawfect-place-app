import type { CustomerOrder } from '../api/types';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

type Props = { order: CustomerOrder };

export const OrderListItem = ({ order }: Props) => {
  return (
    <Box>
      <Text>{order.name}</Text>
    </Box>
  );
};
