import type {
  ProductEdge,
  SearchResultItemConnection,
} from '@shopify/hydrogen-react/storefront-api-types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

type ProductSearchResultItemConnection = SearchResultItemConnection & {
  edges: ProductEdge[];
};

const SEARCH_QUERY_STALE_TIME = 5 * 60 * 1000; // 5 mins

const getSearchProductsGQLQuery = (query: string, endCursor?: string) => `
{
  search(query: "${query}", first: 10, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: RELEVANCE, types: PRODUCT, unavailableProducts: LAST) {
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

const fetchSearchProducts = async (handle: string, pageParam?: string) => {
  const res = await shopifyStorefrontQuery<{
    search: ProductSearchResultItemConnection;
  }>(getSearchProductsGQLQuery(handle, pageParam));
  return res.data.search;
};

const flattenSearchResultPagesData = (
  data: InfiniteData<ProductSearchResultItemConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useSearchProducts = (query: string) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchSearchProducts(query, pageParam),
    queryKey: ['search', { query }, 'products'],
    staleTime: SEARCH_QUERY_STALE_TIME,
    initialPageParam: '',
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    select: flattenSearchResultPagesData,
  });
};
