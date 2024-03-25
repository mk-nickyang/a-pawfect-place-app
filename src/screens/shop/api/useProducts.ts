import type { ProductConnection } from '@shopify/hydrogen-react/storefront-api-types';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { productsQuery } from './productsQuery';

const flattenProductsPagesData = (
  data: InfiniteData<ProductConnection, string>,
) => data.pages.flatMap((page) => page.edges);

export const useProducts = () => {
  return useInfiniteQuery({
    ...productsQuery,
    select: flattenProductsPagesData,
  });
};
