import * as Haptics from 'expo-haptics';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { useAddToCart } from '../../api/useAddToCart';

import { Button } from '@/components/Button';
import theme from '@/theme';

type Props = { selectedVariantId: string; isSoldOut: boolean };

export const AddToCartButton = memo(
  ({ selectedVariantId, isSoldOut }: Props) => {
    const { mutate, isPending } = useAddToCart();

    return (
      <Button
        label={isSoldOut ? 'SOLD OUT' : 'ADD TO CART'}
        loading={isPending}
        disabled={isSoldOut}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          mutate(selectedVariantId);
        }}
        style={styles.container}
      />
    );
  },
);

AddToCartButton.displayName = 'AddToCartButton';

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.s,
  },
});
