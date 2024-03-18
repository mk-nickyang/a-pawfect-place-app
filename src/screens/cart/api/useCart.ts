import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { getCartQueryKey } from './utils';

import { shopifyQuery } from '@/api';

const getCartGQLQuery = (cartId: string) => `
  {
    cart(id: "${cartId}") {
      id
      checkoutUrl
      note
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              amountPerQuantity {
                amount
              }
              compareAtAmountPerQuantity {
                amount
              }
              totalAmount {
                amount
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                image {
                  url
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const fetchCart = async (cartId: string) => {
  if (!cartId) return;

  const res = await shopifyQuery<{ cart: Cart }>(getCartGQLQuery(cartId));
  return res.data.cart;
};

export const useCart = (cartId: string) => {
  return useQuery({
    queryFn: () => fetchCart(cartId),
    queryKey: getCartQueryKey(cartId),
  });
};
