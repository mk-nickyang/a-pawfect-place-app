import { CartNoteUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getCartQueryKey } from './utils';

import { shopifyQuery } from '@/api';

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
  const res = await shopifyQuery<{ cartNoteUpdate?: CartNoteUpdatePayload }>(
    updateCartNoteGQLMutation(payload),
  );
  return res.data.cartNoteUpdate?.cart?.id;
};

export const useUpdateCartNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartNotePayload) => updateCartNote(payload),
    onSuccess: (cartId) => {
      if (cartId) {
        // Refetch cart query when cart is updated
        queryClient.invalidateQueries({ queryKey: getCartQueryKey(cartId) });
      }
    },
  });
};
