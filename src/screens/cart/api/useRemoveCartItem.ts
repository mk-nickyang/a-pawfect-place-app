import type {
  Cart,
  CartLinesRemovePayload,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { logQueryError, shopifyQuery } from '@/api';
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

export const useRemoveCartItem = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lineId: string) => removeCartItem({ lineId, cartId }),
    onMutate: async (removedLineId) => {
      const cartQueryKey = getCartQueryKey(cartId);

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: cartQueryKey });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<Cart>(cartQueryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<Cart>(cartQueryKey, (oldData) => {
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
    onError: (err, _removedLineId, context) => {
      logQueryError(err);

      if (context?.previousCart) {
        queryClient.setQueryData<Cart>(
          getCartQueryKey(cartId),
          context?.previousCart,
        );
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey(cartId) });
    },
  });
};
