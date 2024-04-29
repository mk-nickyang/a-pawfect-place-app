import { memo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useUpdateCartItemQuantity } from '../api/useUpdateCartItemQuantity';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { Haptics } from '@/modules/haptics';

type Props = { quantity: number; lineId: string; cartId: string };

const QUANTITY_BUTTON_SIZE = 36;

export const LineItemQuantity = memo(({ quantity, lineId, cartId }: Props) => {
  const { mutate, isPending } = useUpdateCartItemQuantity(cartId);

  const onQuantityUpdate = (newQuantity: number) => {
    mutate(
      { lineId, quantity: newQuantity },
      {
        onSuccess: () => {
          Haptics.impact();
        },
      },
    );
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
        {isPending ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text>{quantity}</Text>
        )}
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
