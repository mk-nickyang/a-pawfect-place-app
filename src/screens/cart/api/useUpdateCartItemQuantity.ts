import { CartLinesUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCartQueryKey } from './utils';

import { shopifyQuery } from '@/api';

type UpdateCartItemQuantityPayload = {
  cartId: string;
  lineId: string;
  quantity: number;
};

const updateCartItemQuantityGQLMutation = ({
  lineId,
  quantity,
  cartId,
}: UpdateCartItemQuantityPayload) => `
  mutation {
    cartLinesUpdate(
      cartId: "${cartId}"
      lines: [{ id: "${lineId}", quantity: ${quantity} }]
    ) {
      cart {
        id
      }
    }
  }
`;

const updateCartItemQuantity = async (
  payload: UpdateCartItemQuantityPayload,
) => {
  const res = await shopifyQuery<{ cartLinesUpdate?: CartLinesUpdatePayload }>(
    updateCartItemQuantityGQLMutation(payload),
  );
  return res.data.cartLinesUpdate?.cart?.id;
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartItemQuantityPayload) =>
      updateCartItemQuantity(payload),
    onSuccess: (cartId) => {
      if (cartId) {
        // Refetch cart query when cart is updated
        queryClient.invalidateQueries({ queryKey: getCartQueryKey(cartId) });
      }
    },
  });
};
