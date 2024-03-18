import type {
  Collection,
  ProductConnection,
} from '@shopify/hydrogen-react/storefront-api-types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { shopifyQuery } from '@/api';

const getCollectionGQLQuery = (endCursor?: string) => `
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

const fetchCollectionProducts = async ({
  pageParam,
}: {
  pageParam?: string;
}) => {
  const res = await shopifyQuery<{ collection: Collection }>(
    getCollectionGQLQuery(pageParam),
  );
  return res.data.collection.products;
};

const flattenProductsPagesData = (
  data: InfiniteData<ProductConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useCollection = () => {
  return useInfiniteQuery({
    queryFn: fetchCollectionProducts,
    queryKey: ['collection', 'products'],
    select: flattenProductsPagesData,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
  });
};
