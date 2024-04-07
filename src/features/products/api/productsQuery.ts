import type { Collection } from '@shopify/hydrogen-react/storefront-api-types';
import { infiniteQueryOptions } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const getCollectionProductsGQLQuery = (endCursor?: string) => `
  {
    collection(handle: "all") {
      products(first: 10, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            featuredImage {
              url
              id
            }
            availableForSale
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }    
      }
    }
  }
`;

const fetchProducts = async ({ pageParam }: { pageParam?: string }) => {
  const res = await shopifyStorefrontQuery<{ collection: Collection }>(
    getCollectionProductsGQLQuery(pageParam),
  );
  return res.data.collection.products;
};

export const productsQuery = infiniteQueryOptions({
  queryFn: fetchProducts,
  queryKey: ['collection', 'products'],
  initialPageParam: '',
  getNextPageParam: (lastPage) =>
    lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
});
