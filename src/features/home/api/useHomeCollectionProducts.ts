import type {
  Collection,
  ProductEdge,
} from '@shopify/hydrogen-react/storefront-api-types';
import { type UseQueryResult, useQueries } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

export const HOME_COLLECTIONS = [
  { handle: 'app-top-picks', title: 'Our Top Picks' },
  { handle: 'app-new-arrivals', title: 'New Arrivals' },
  { handle: 'pet-slings', title: 'Pet Kangaroo Slings' },
  { handle: 'sale', title: 'Sale' },
] as const;

const getHomeCollectionProductsGQLQuery = (handle: string) => `
  {
    collection(handle: "${handle}") {
      products(first: 8, sortKey: MANUAL) {
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
      }
    }
  }
  `;

const fetchHomeCollectionProducts = async (handle: string) => {
  const res = await shopifyStorefrontQuery<{ collection: Collection }>(
    getHomeCollectionProductsGQLQuery(handle),
  );
  return res.data.collection.products.edges;
};

const combine = (results: UseQueryResult<ProductEdge[]>[]) => {
  return {
    data: results.map((result) => result.data || []),
    isLoading: results.some((result) => result.isLoading),
  };
};

export const useHomeCollectionProducts = () => {
  return useQueries({
    queries: HOME_COLLECTIONS.map(({ handle }) => ({
      queryFn: () => fetchHomeCollectionProducts(handle),
      queryKey: ['home-collection', { handle }, 'products'],
    })),
    combine,
  });
};
