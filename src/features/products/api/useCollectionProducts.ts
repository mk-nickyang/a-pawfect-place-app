import type {
  Collection,
  ProductConnection,
} from '@shopify/hydrogen-react/storefront-api-types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const PRODUCTS_QUERY_STALE_TIME = 5 * 60 * 1000; // 5 mins

const getCollectionProductsGQLQuery = (handle: string, endCursor?: string) => `
{
  collection(handle: "${handle}") {
    products(first: 10, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: RELEVANCE) {
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

const fetchCollectionProducts = async (handle: string, pageParam?: string) => {
  const res = await shopifyStorefrontQuery<{ collection: Collection }>(
    getCollectionProductsGQLQuery(handle, pageParam),
  );
  return res.data.collection.products;
};

const flattenProductsPagesData = (
  data: InfiniteData<ProductConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useCollectionProducts = (handle: string) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchCollectionProducts(handle, pageParam),
    queryKey: ['collection', { handle }, 'products'],
    staleTime: PRODUCTS_QUERY_STALE_TIME,
    initialPageParam: '',
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    select: flattenProductsPagesData,
  });
};
