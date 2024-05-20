import { useNavigation } from '@react-navigation/native';
import { memo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useAddProductToCart } from '../../api/useAddProductToCart';

import {
  BottomSheetModal,
  type BottomSheetModalRef,
} from '@/components/BottomSheetModal';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { Haptics } from '@/modules/haptics';
import { useTheme, spacing } from '@/theme';

type Props = { selectedVariantId: string; isSoldOut: boolean };

export const AddToCartButton = memo(
  ({ selectedVariantId, isSoldOut }: Props) => {
    const modalRef = useRef<BottomSheetModalRef>(null);

    const { colors } = useTheme();

    const navigation = useNavigation();

    const { mutate, isPending } = useAddProductToCart();

    const onAddToCart = () => {
      mutate(selectedVariantId, {
        onSuccess: () => {
          Haptics.impact();
          modalRef.current?.present();
        },
      });
    };

    return (
      <>
        <Button
          label={isSoldOut ? 'SOLD OUT' : 'ADD TO CART'}
          loading={isPending}
          disabled={isSoldOut}
          onPress={onAddToCart}
          style={styles.container}
        />

        <BottomSheetModal modalRef={modalRef} size="medium">
          <Box flex={1} justifyContent="space-between">
            <Box g="m" alignItems="center">
              <Icon name="check-circle" size={64} color={colors.success} />
              <Text variant="h3">ITEM ADDED TO YOUR CART</Text>
            </Box>

            <Box g="s">
              <Button
                label="GO TO CART"
                onPress={() => {
                  modalRef.current?.close();
                  navigation.navigate('CartTab');
                }}
              />

              <Button
                label="CONTINUE SHOPPING"
                variant="secondary"
                onPress={() => modalRef.current?.close()}
              />
            </Box>
          </Box>
        </BottomSheetModal>
      </>
    );
  },
);

AddToCartButton.displayName = 'AddToCartButton';

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.s,
  },
  skottie: {
    width: 60,
    height: 60,
  },
});
