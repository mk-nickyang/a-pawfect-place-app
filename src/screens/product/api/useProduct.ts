import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { shopifyQuery } from '@/api';

const getProductGQLQuery = (productId: string) => `
  {
    product(id: "${productId}") {
      id
      descriptionHtml
      title
      images(first: 10) {
        edges {
          node {
            url
            id
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            id
            title
            selectedOptions {
              name
              value
            }
            availableForSale
          }
        }
      }
      options(first: 10) {
        id
        name
        values
      }
    }
  }
`;

const fetchProduct = async (productId: string) => {
  const res = await shopifyQuery<{ product: Product }>(
    getProductGQLQuery(productId),
  );
  return res.data.product;
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryFn: () => fetchProduct(productId),
    queryKey: ['product', { productId }],
  });
};
