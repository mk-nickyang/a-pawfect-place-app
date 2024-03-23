import type { CartBuyerIdentityUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cartQuery } from './cartQuery';

import { shopifyStorefrontQuery } from '@/api';

type UpdateCartBuyerIdentityPayload = {
  cartId: string;
  email?: string;
};

const updateCartBuyerIdentityGQLMutation = ({
  cartId,
  email,
}: UpdateCartBuyerIdentityPayload) => `
  mutation {
    cartBuyerIdentityUpdate(
      cartId: "${cartId}"
      buyerIdentity: ${email ? `{ email: "${email}" }` : {}}
    ) {
      cart {
        id
      }
    }
  }
`;

const updateCartBuyerIdentity = async (
  payload: UpdateCartBuyerIdentityPayload,
) => {
  const res = await shopifyStorefrontQuery<{
    cartBuyerIdentityUpdate?: CartBuyerIdentityUpdatePayload;
  }>(updateCartBuyerIdentityGQLMutation(payload));

  return res.data.cartBuyerIdentityUpdate?.cart?.id;
};

export const useUpdateCartBuyerIdentity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartBuyerIdentityPayload) =>
      updateCartBuyerIdentity(payload),
    onSuccess: (_data, { cartId }) => {
      // Refetch cart query when cart is updated
      queryClient.invalidateQueries({ queryKey: cartQuery(cartId).queryKey });
    },
  });
};
