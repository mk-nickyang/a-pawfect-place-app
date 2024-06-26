import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { CartLineItem } from './CartLineItem';
import { CartNote } from './CartNote';
import { CheckoutSuccessModal } from './CheckoutSuccessModal';
import { selectCartItemsLength, useCart } from '../api/useCart';
import { useShopifyCheckout } from '../hooks/useShopifyCheckout';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Text } from '@/components/Text';
import { spacing } from '@/theme';
import { formatPrice } from '@/utils/currency';

type Props = { cartId: string; emptyView: JSX.Element };

const keyExtractor = (item: BaseCartLineEdge) => item.node.id;

export const CartList = memo(({ cartId, emptyView }: Props) => {
  const navigation = useNavigation();

  const { data: cart } = useCart(cartId);

  const { openCheckoutModal, checkoutSuccessModalRef } =
    useShopifyCheckout(cart);

  const renderItem: ListRenderItem<BaseCartLineEdge> = useCallback(
    ({ item }) => <CartLineItem cartLine={item.node} cartId={cartId} />,
    [cartId],
  );

  const cartItemsLength = cart ? selectCartItemsLength(cart) : 0;

  const cartSubtotal = formatPrice(cart?.cost.subtotalAmount);
  const cartTotal = formatPrice(cart?.cost.totalAmount, { currencyCode: true });

  const listFooter = useMemo(
    () =>
      cartItemsLength ? (
        <Box
          p="m"
          g="s"
          borderTopWidth={StyleSheet.hairlineWidth}
          borderColor="borderPrimary"
        >
          <Box mb="s" g="s">
            <Box flexDirection="row" alignItems="center">
              <Text fontWeight="600">ORDER SUMMARY</Text>
              <Text>
                {' '}
                | {cartItemsLength} ITEM{cartItemsLength > 0 ? 'S' : ''}
              </Text>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="600">SUBTOTAL</Text>
              <Text>{cartSubtotal}</Text>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="600">ORDER TOTAL</Text>
              <Text variant="h3">{cartTotal}</Text>
            </Box>
          </Box>

          <CartNote note={cart?.note} cartId={cartId} />

          <Button
            label="CHECKOUT"
            onPress={openCheckoutModal}
            style={styles.checkoutBtn}
          />
          <Button
            variant="secondary"
            label="CONTINUE SHOPPING"
            onPress={() => navigation.navigate('ProductsTab')}
          />
        </Box>
      ) : null,
    [
      cart?.note,
      cartId,
      cartItemsLength,
      cartSubtotal,
      cartTotal,
      navigation,
      openCheckoutModal,
    ],
  );

  if (!cart || cartItemsLength === 0) return emptyView;

  return (
    <>
      <FlashList
        data={cart.lines.edges}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={250}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={listFooter}
      />

      <CheckoutSuccessModal modalRef={checkoutSuccessModalRef} />
    </>
  );
});

CartList.displayName = 'CartList';

const styles = StyleSheet.create({
  checkoutBtn: {
    marginBottom: spacing.s,
  },
});
