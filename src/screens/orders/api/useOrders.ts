import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ordersQuery } from './ordersQuery';
import type { CustomerOrders } from './types';

const flattenOrdersPagesData = (data: InfiniteData<CustomerOrders, string>) =>
  data.pages.flatMap((page) => page.edges);

export const useOrders = () =>
  useInfiniteQuery({
    ...ordersQuery,
    staleTime: 1000 * 60 * 5, // 5 mins
    select: flattenOrdersPagesData,
  });
