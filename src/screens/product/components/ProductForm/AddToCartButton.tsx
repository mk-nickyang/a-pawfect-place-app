import { useNavigation } from '@react-navigation/native';
import { memo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Skottie } from 'react-native-skottie';

import { useAddToCart } from '../../api/useAddToCart';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Modal, ModalRef } from '@/components/Modal';
import { Text } from '@/components/Text';
import { Haptics } from '@/modules/haptics';
import theme from '@/theme';

type Props = { selectedVariantId: string; isSoldOut: boolean };

export const AddToCartButton = memo(
  ({ selectedVariantId, isSoldOut }: Props) => {
    const modalRef = useRef<ModalRef>(null);

    const navigation = useNavigation();

    const { mutate, isPending } = useAddToCart();

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

        <Modal modalRef={modalRef} size="small">
          <Box flex={1} justifyContent="space-between">
            <Box g="s" alignItems="center">
              <Text variant="h3">ITEM ADDED TO YOUR CART</Text>

              <Skottie
                style={styles.skottie}
                source={require('./assets/lottie-success.json')}
                autoPlay
              />
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
        </Modal>
      </>
    );
  },
);

AddToCartButton.displayName = 'AddToCartButton';

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.s,
  },
  skottie: {
    width: 60,
    height: 60,
  },
});
