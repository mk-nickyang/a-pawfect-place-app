import {
  CartCreatePayload,
  CartLinesAddPayload,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';
import { myAccountQuery } from '@/features/account/api/myAccountQuery';
import { cartQuery } from '@/features/cart/api/cartQuery';
import { useCartId } from '@/features/cart/hooks/useCartId';

type CreateCartPayload = { variantId: string; email?: string };

const createCartGQLMutation = ({ variantId, email }: CreateCartPayload) => `
mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "${variantId}"
        }
      ]
      buyerIdentity: ${email ? `{ email: "${email}" }` : '{}'}
    }
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

type AddItemToCartPayload = { variantId: string; cartId: string };

const addItemToCartGQLMutation = ({
  variantId,
  cartId,
}: AddItemToCartPayload) => `
mutation {
  cartLinesAdd(
    cartId: "${cartId}"
    lines: { merchandiseId: "${variantId}", quantity: 1 }
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

const createCart = async (payload: CreateCartPayload) => {
  const res = await shopifyStorefrontQuery<{ cartCreate?: CartCreatePayload }>(
    createCartGQLMutation(payload),
  );
  return res.data.cartCreate?.cart?.id;
};

const addItemToCart = async (payload: AddItemToCartPayload) => {
  const res = await shopifyStorefrontQuery<{
    cartLinesAdd?: CartLinesAddPayload;
  }>(addItemToCartGQLMutation(payload));
  return res.data.cartLinesAdd?.cart?.id;
};

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();

  const { cartId, setCartId } = useCartId();

  return useMutation({
    mutationFn: (variantId: string) => {
      // Check if has existing cart
      return cartId
        ? addItemToCart({ variantId, cartId })
        : createCart({
            variantId,
            email: queryClient.getQueryData(myAccountQuery.queryKey)
              ?.emailAddress?.emailAddress,
          });
    },
    onSuccess: (cartId) => {
      if (cartId) {
        // Update stored cartId
        setCartId(cartId);
        // Refetch cart query when cart is updated
        return queryClient.invalidateQueries({
          queryKey: cartQuery(cartId).queryKey,
        });
      }
    },
  });
};
