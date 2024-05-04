import type {
  Collection,
  ProductCollectionSortKeys,
  ProductConnection,
  ProductFilter,
} from '@shopify/hydrogen-react/storefront-api-types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { parseProductFilterGQLQueryString } from './utils';

import { shopifyStorefrontQuery } from '@/api';

type CollectionProductsQueryParams = {
  handle: string;
  sortKey: ProductCollectionSortKeys;
  reverse: boolean;
  filters: ProductFilter;
};

const PRODUCTS_QUERY_STALE_TIME = 5 * 60 * 1000; // 5 mins

const getCollectionProductsGQLQuery = ({
  handle,
  sortKey,
  reverse,
  filters,
  endCursor,
}: CollectionProductsQueryParams & { endCursor?: string }) => `
{
  collection(handle: "${handle}") {
    products(first: 10, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: ${sortKey}, reverse: ${reverse}, filters: [${parseProductFilterGQLQueryString(filters)}]) {
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

const fetchCollectionProducts = async ({
  pageParam,
  ...queryParams
}: CollectionProductsQueryParams & { pageParam?: string }) => {
  const res = await shopifyStorefrontQuery<{ collection: Collection }>(
    getCollectionProductsGQLQuery({
      ...queryParams,
      endCursor: pageParam,
    }),
  );
  return res.data.collection.products;
};

const flattenProductsPagesData = (
  data: InfiniteData<ProductConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useCollectionProducts = (
  queryParams: CollectionProductsQueryParams,
) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      fetchCollectionProducts({ ...queryParams, pageParam }),
    queryKey: ['collection', queryParams, 'products'],
    staleTime: PRODUCTS_QUERY_STALE_TIME,
    initialPageParam: '',
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    select: flattenProductsPagesData,
  });
};
