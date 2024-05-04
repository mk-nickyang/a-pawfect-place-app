import type {
  ProductEdge,
  ProductFilter,
  SearchResultItemConnection,
  SearchSortKeys,
} from '@shopify/hydrogen-react/storefront-api-types';
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { parseProductFilterGQLQueryString } from './utils';

import { shopifyStorefrontQuery } from '@/api';

type ProductSearchResultItemConnection = SearchResultItemConnection & {
  edges: ProductEdge[];
};

type SearchProductsQueryParams = {
  query: string;
  sortKey: SearchSortKeys;
  reverse: boolean;
  filters: ProductFilter;
};

const SEARCH_QUERY_STALE_TIME = 5 * 60 * 1000; // 5 mins

const getSearchProductsGQLQuery = ({
  query,
  sortKey,
  reverse,
  filters,
  endCursor,
}: SearchProductsQueryParams & { endCursor?: string }) => `
{
  search(query: "${query}", first: 10, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: ${sortKey}, reverse: ${reverse}, types: PRODUCT, unavailableProducts: LAST, productFilters: [${parseProductFilterGQLQueryString(filters)}]) {
    edges {
      node {
        ... on Product {
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
    pageInfo {
      hasNextPage
      endCursor
    }    
  }
}
`;

const fetchSearchProducts = async ({
  pageParam,
  ...queryParams
}: SearchProductsQueryParams & { pageParam?: string }) => {
  const res = await shopifyStorefrontQuery<{
    search: ProductSearchResultItemConnection;
  }>(getSearchProductsGQLQuery({ ...queryParams, endCursor: pageParam }));
  return res.data.search;
};

const flattenSearchResultPagesData = (
  data: InfiniteData<ProductSearchResultItemConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useSearchProducts = (queryParams: SearchProductsQueryParams) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      fetchSearchProducts({ ...queryParams, pageParam }),
    queryKey: ['search', queryParams, 'products'],
    staleTime: SEARCH_QUERY_STALE_TIME,
    initialPageParam: '',
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    select: flattenSearchResultPagesData,
  });
};
