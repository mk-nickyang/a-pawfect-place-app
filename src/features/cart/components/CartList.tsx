import { useNavigation } from '@react-navigation/native';
import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { CartLineItem } from './CartLineItem';
import { CartNote } from './CartNote';
import { selectCartItemsLength, useCart } from '../api/useCart';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Text } from '@/components/Text';

type Props = { cartId: string; emptyView: JSX.Element };

const keyExtractor = (item: BaseCartLineEdge) => item.node.id;

export const CartList = memo(({ cartId, emptyView }: Props) => {
  const navigation = useNavigation();

  const { data: cart } = useCart(cartId);

  const shopifyCheckout = useShopifyCheckoutSheet();

  /**
   * Preload checkout page for faster loading
   * @see https://github.com/Shopify/checkout-sheet-kit-react-native?tab=readme-ov-file#preloading
   */
  useEffect(() => {
    if (cart?.checkoutUrl) {
      shopifyCheckout.preload(cart.checkoutUrl);
    }
  }, [cart?.checkoutUrl, shopifyCheckout]);

  const renderItem: ListRenderItem<BaseCartLineEdge> = useCallback(
    ({ item }) => <CartLineItem cartLine={item.node} cartId={cartId} />,
    [cartId],
  );

  const cartItemsLength = cart ? selectCartItemsLength(cart) : 0;

  const cartSubtotal = cart?.cost.subtotalAmount.amount;
  const cartTotal = cart?.cost.totalAmount.amount;
  const cartCurrencyCode = cart?.cost.totalAmount.currencyCode;

  const listFooter = useMemo(
    () =>
      cartItemsLength ? (
        <Box p="m" g="s" borderTopWidth={1} borderColor="borderPrimary">
          <Box mb="m" g="s">
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
              <Text>${cartSubtotal}</Text>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="600">ORDER TOTAL</Text>
              <Text variant="h3">
                ${cartTotal} {cartCurrencyCode}
              </Text>
            </Box>
          </Box>

          <CartNote note={cart?.note} cartId={cartId} />

          <Button
            label="CHECKOUT"
            onPress={() =>
              cart?.checkoutUrl && shopifyCheckout.present(cart.checkoutUrl)
            }
          />
          <Button
            variant="secondary"
            label="CONTINUE SHOPPING"
            onPress={() => navigation.navigate('ProductsTab')}
          />
        </Box>
      ) : null,
    [
      cart?.checkoutUrl,
      cart?.note,
      cartCurrencyCode,
      cartId,
      cartItemsLength,
      cartSubtotal,
      cartTotal,
      navigation,
      shopifyCheckout,
    ],
  );

  if (!cart || cartItemsLength === 0) return emptyView;

  return (
    <FlashList
      data={cart.lines.edges}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={250}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={listFooter}
    />
  );
});

CartList.displayName = 'CartList';
