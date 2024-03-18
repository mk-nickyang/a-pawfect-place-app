import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types';

import { CartLineItem } from './CartLineItem';
import { useCart } from '../../api/useCart';
type Props = { cartId: string };

const keyExtractor = (item: BaseCartLineEdge) => item.node.id;

const renderItem: ListRenderItem<BaseCartLineEdge> = ({ item }) => (
  <CartLineItem cartLine={item.node} />
);

export const CartList = ({ cartId }: Props) => {
  const { data: cart } = useCart(cartId);

  if (!cart?.lines.edges.length) return null;

  return (
    <FlashList
      data={cart.lines.edges}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={150}
    />
  );
};
