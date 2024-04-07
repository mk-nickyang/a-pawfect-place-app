import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { cartQuery } from './cartQuery';

export const useCart = (cartId: string) => useQuery(cartQuery(cartId));

export const selectCartItemsLength = (cart: Cart) => {
  let count = 0;
  for (const cartLine of cart?.lines.edges || []) {
    count += cartLine.node.quantity;
  }
  return count;
};

export const useCartItemsLength = (cartId: string) => {
  return useQuery({
    ...cartQuery(cartId),
    select: selectCartItemsLength,
  });
};
