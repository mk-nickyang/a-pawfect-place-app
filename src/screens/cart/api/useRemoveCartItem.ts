import { CartLinesRemovePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopifyQuery } from '@/api';
import { getCartQueryKey } from '@/screens/cart/api/utils';

type RemoveCartItemPayload = { lineId: string; cartId: string };

const removeCartItemGQLMutation = ({
  lineId,
  cartId,
}: RemoveCartItemPayload) => `
  mutation {
    cartLinesRemove(
      cartId: "${cartId}"
      lineIds: "${lineId}"
    ) {
      cart {
        id
      }
    }
  }
`;

const removeCartItem = async (payload: RemoveCartItemPayload) => {
  const res = await shopifyQuery<{ cartLinesRemove?: CartLinesRemovePayload }>(
    removeCartItemGQLMutation(payload),
  );
  return res.data.cartLinesRemove?.cart?.id;
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RemoveCartItemPayload) => removeCartItem(payload),
    onSuccess: (cartId) => {
      if (cartId) {
        // Refetch cart query when cart is updated
        queryClient.invalidateQueries({ queryKey: getCartQueryKey(cartId) });
      }
    },
  });
};
