import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo, useMemo } from 'react';

import { CartLineItem } from './CartLineItem';
import { CartNote } from './CartNote';
import { useCart } from '../api/useCart';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Text } from '@/components/Text';

type Props = { cartId: string; emptyView: JSX.Element };

const keyExtractor = (item: BaseCartLineEdge) => item.node.id;

const renderItem: ListRenderItem<BaseCartLineEdge> = ({ item }) => (
  <CartLineItem cartLine={item.node} />
);

export const CartList = memo(({ cartId, emptyView }: Props) => {
  const navigation = useNavigation();

  const { data: cart } = useCart(cartId);

  const cartItemsLength = cart?.lines.edges.length;
  const cartSubtotal = cart?.cost.subtotalAmount.amount;
  const cartTotal = cart?.cost.totalAmount.amount;

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
              <Text variant="h3">${cartTotal}</Text>
            </Box>
          </Box>

          <CartNote note={cart.note} />

          <Button
            label="CHECKOUT"
            onPress={() =>
              cart?.checkoutUrl &&
              navigation.navigate('Checkout', { checkoutUrl: cart.checkoutUrl })
            }
          />
          <Button
            variant="secondary"
            label="CONTINUE SHOPPING"
            onPress={() => navigation.navigate('ShopTab')}
          />
        </Box>
      ) : null,
    [
      cart?.checkoutUrl,
      cart?.note,
      cartItemsLength,
      cartSubtotal,
      cartTotal,
      navigation,
    ],
  );

  if (!cartItemsLength) return emptyView;

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
