import type { CartLinesRemovePayload } from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { cartQuery } from './cartQuery';

import { shopifyStorefrontQuery } from '@/api';

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
      userErrors {
        code
        field
        message
      }
    }
  }
`;

const removeCartItem = async (payload: RemoveCartItemPayload) => {
  const res = await shopifyStorefrontQuery<{
    cartLinesRemove?: CartLinesRemovePayload;
  }>(removeCartItemGQLMutation(payload));
  return res.data.cartLinesRemove?.cart?.id;
};

export const useRemoveCartItem = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove-cart', { cartId }],
    mutationFn: (lineId: string) => removeCartItem({ lineId, cartId }),
    onMutate: async (removedLineId) => {
      const cartQueryKey = cartQuery(cartId).queryKey;

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: cartQueryKey });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(cartQueryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(cartQueryKey, (oldData) => {
        if (!oldData) return;
        return produce(oldData, (draft) => {
          draft.lines.edges = draft.lines.edges.filter(
            (cartLine) => cartLine.node.id !== removedLineId,
          );
        });
      });

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _removedLineId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          cartQuery(cartId).queryKey,
          context?.previousCart,
        );
      }
    },
    onSettled: () => {
      const hasOtherRemovingCartMutation =
        queryClient.isMutating({ mutationKey: ['remove-cart', { cartId }] }) >
        1;

      if (hasOtherRemovingCartMutation) return;

      // IF there is no other ongoing mutation, refetch cart after error or success
      return queryClient.invalidateQueries({
        queryKey: cartQuery(cartId).queryKey,
      });
    },
  });
};
