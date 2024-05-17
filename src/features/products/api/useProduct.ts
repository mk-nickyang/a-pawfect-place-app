import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const getProductGQLQuery = (
  productIdOrHandle: string,
  productKey?: 'handle' | 'id',
) => `
  {
    product(${productKey || 'id'}: "${productIdOrHandle}") {
      id
      descriptionHtml
      title
      onlineStoreUrl
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

const fetchProduct = async (
  productIdOrHandle: string,
  productKey?: 'handle' | 'id',
) => {
  const res = await shopifyStorefrontQuery<{ product: Product }>(
    getProductGQLQuery(productIdOrHandle, productKey),
  );
  return res.data.product;
};

/**
 * When navigate to a product screen via deep linking,
 * it's possible we only have `productHandle` available.
 * So here we check if the Shopify `productId` has hyphens,
 * if so, we assume it's a `productHandle` and use it for query.
 */
export const useProduct = (productIdOrHandle: string) => {
  return useQuery({
    queryFn: () =>
      fetchProduct(
        productIdOrHandle,
        productIdOrHandle.includes('-') ? 'handle' : 'id',
      ),
    queryKey: ['product', { productId: productIdOrHandle }],
  });
};
