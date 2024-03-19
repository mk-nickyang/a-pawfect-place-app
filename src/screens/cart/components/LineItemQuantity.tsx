import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { useUpdateCartItemQuantity } from '../api/useUpdateCartItemQuantity';
import { getCurrentCartId } from '../utils';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = { quantity: number; lineId: string };

const QUANTITY_BUTTON_SIZE = 40;

export const LineItemQuantity = memo(({ quantity, lineId }: Props) => {
  const { mutate, isPending } = useUpdateCartItemQuantity();

  const onQuantityUpdate = (newQuantity: number) => {
    const cartId = getCurrentCartId();
    if (!cartId) return;

    mutate({ lineId, cartId, quantity: newQuantity });
  };

  return (
    <Box mb="s" flexDirection="row" borderWidth={1} borderColor="borderPrimary">
      <PressableOpacity
        disabled={isPending}
        onPress={() => onQuantityUpdate(quantity - 1)}
        style={styles.box}
      >
        <Text color={isPending ? 'disabled' : 'contentPrimary'}>-</Text>
      </PressableOpacity>

      <Box
        style={styles.box}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderColor="borderPrimary"
      >
        <Text>{quantity}</Text>
      </Box>

      <PressableOpacity
        disabled={isPending}
        onPress={() => onQuantityUpdate(quantity + 1)}
        style={styles.box}
      >
        <Text color={isPending ? 'disabled' : 'contentPrimary'}>+</Text>
      </PressableOpacity>
    </Box>
  );
});

LineItemQuantity.displayName = 'LineItemQuantity';

const styles = StyleSheet.create({
  box: {
    width: QUANTITY_BUTTON_SIZE,
    height: QUANTITY_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
