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
      cost {
        subtotalAmount {
          amount
        }
        totalAmount {
          amount
        }
      }
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
                  id
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
  const res = await shopifyQuery<{ cart: Cart }>(getCartGQLQuery(cartId));
  return res.data.cart;
};

export const useCart = (cartId: string) => {
  return useQuery({
    queryFn: () => fetchCart(cartId),
    queryKey: getCartQueryKey(cartId),
  });
};

const selectCartItemsLength = (cart: Cart) => cart.lines.edges.length;

export const useCartItemsLength = (cartId: string) => {
  return useQuery({
    queryFn: () => fetchCart(cartId),
    queryKey: getCartQueryKey(cartId),
    select: selectCartItemsLength,
  });
};
