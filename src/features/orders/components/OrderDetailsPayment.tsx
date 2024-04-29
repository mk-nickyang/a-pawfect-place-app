import { Image } from 'expo-image';

import type { OrderTransaction } from '../api/types';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

type Props = { transaction: OrderTransaction };

const PAYMENT_ICON_WIDTH = 38;
const PAYMENT_ICON_HEIGHT = 24;

export const OrderDetailsPayment = ({ transaction }: Props) => {
  const paymentType = transaction.typeDetails?.name;

  switch (paymentType) {
    case 'paypal':
      return <Text>Paypal</Text>;
    default:
      return (
        <Box flexDirection="row" alignItems="center" pt="s" g="s">
          <Image
            source={transaction.paymentIcon?.url}
            style={{
              width: PAYMENT_ICON_WIDTH,
              height: PAYMENT_ICON_HEIGHT,
            }}
          />
          {transaction.paymentDetails?.last4 ? (
            <Text>ending with {transaction.paymentDetails.last4}</Text>
          ) : null}
        </Box>
      );
  }
};
