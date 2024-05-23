import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';
import { queryOptions } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const getCartGQLQuery = (cartId: string) => `
  {
    cart(id: "${cartId}") {
      id
      checkoutUrl
      note
      updatedAt
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
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
                quantityAvailable
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
  const res = await shopifyStorefrontQuery<{ cart: Cart }>(
    getCartGQLQuery(cartId),
  );
  return res.data.cart;
};

export const cartQuery = (cartId: string) =>
  queryOptions({
    queryFn: () => fetchCart(cartId),
    queryKey: ['cart', { cartId }],
  });
