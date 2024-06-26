import type { CartNoteUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cartQuery } from './cartQuery';

import { shopifyStorefrontQuery } from '@/api';

type UpdateCartNotePayload = {
  cartId: string;
  note: string;
};

const updateCartNoteGQLMutation = ({ note, cartId }: UpdateCartNotePayload) => `
  mutation {
    cartNoteUpdate(
      cartId: "${cartId}"
      note: "${note}"
    ) {
      cart {
        id
      }
    }
  }
`;

const updateCartNote = async (payload: UpdateCartNotePayload) => {
  const res = await shopifyStorefrontQuery<{
    cartNoteUpdate?: CartNoteUpdatePayload;
  }>(updateCartNoteGQLMutation(payload));
  return res.data.cartNoteUpdate?.cart?.id;
};

export const useUpdateCartNote = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: string) => updateCartNote({ cartId, note }),
    onSuccess: () => {
      // Refetch cart query when cart is updated
      return queryClient.invalidateQueries({
        queryKey: cartQuery(cartId).queryKey,
      });
    },
  });
};
