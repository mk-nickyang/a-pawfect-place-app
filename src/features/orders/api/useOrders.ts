import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ordersQuery } from './ordersQuery';
import type { Orders } from './types';

const flattenOrdersPagesData = (data: InfiniteData<Orders, string>) =>
  data.pages.flatMap((page) => page.edges);

export const useOrders = () =>
  useInfiniteQuery({
    ...ordersQuery,
    select: flattenOrdersPagesData,
  });
