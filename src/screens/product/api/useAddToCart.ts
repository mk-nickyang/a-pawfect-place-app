import {
  CartCreatePayload,
  CartLinesAddPayload,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopifyQuery } from '@/api';
import { getCartQueryKey } from '@/screens/cart/api/utils';
import { useCartId } from '@/screens/cart/useCartId';

const createCartGQLMutation = (variantId: string) => `
mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "${variantId}"
        }
      ]
    }
  ) {
    cart {
      id
    }
  }
}
`;

const addItemToCartGQLMutation = ({
  variantId,
  cartId,
}: {
  variantId: string;
  cartId: string;
}) => `
mutation {
  cartLinesAdd(
    cartId: "${cartId}"
    lines: { merchandiseId: "${variantId}", quantity: 1 }
  ) {
    cart {
      id
    }
  }
}
`;

const createCart = async (variantId: string) => {
  const res = await shopifyQuery<{ cartCreate: CartCreatePayload }>(
    createCartGQLMutation(variantId),
  );
  return res.data.cartCreate.cart?.id;
};

const addItemToCart = async ({
  variantId,
  cartId,
}: {
  variantId: string;
  cartId: string;
}) => {
  const res = await shopifyQuery<{ cartLinesAdd: CartLinesAddPayload }>(
    addItemToCartGQLMutation({ variantId, cartId }),
  );
  return res.data.cartLinesAdd.cart?.id;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { cartId, setCartId } = useCartId();

  return useMutation({
    mutationFn: (variantId: string) => {
      // Check if has existing cart
      return cartId
        ? addItemToCart({ variantId, cartId })
        : createCart(variantId);
    },
    onSuccess: (cartId) => {
      if (cartId) {
        // Update stored cartId
        setCartId(cartId);
        // Refetch cart query when cart is updated
        queryClient.invalidateQueries({ queryKey: getCartQueryKey(cartId) });
      }
    },
  });
};
