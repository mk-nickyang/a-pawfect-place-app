import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ordersQuery } from './ordersQuery';

/**
 * If multiple Orders query pages were fetched and user enters the Orders screen again,
 * all fetched pages will be sequentially fetched.
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries#what-happens-when-an-infinite-query-needs-to-be-refetched
 *
 * This can cause overwhelming network usages especially when Shopify Customer Account API is rate-limited.
 * @see https://shopify.dev/docs/api/customer#rate_limits
 *
 * The following hook will reset Orders query pagination when unmount,
 * so only the first page will be fetched each time.
 */
export const useResetOrdersQueryPagination = () => {
  const queryClient = useQueryClient();

  useEffect(
    function resetOrdersQueryPaginationOnUnmount() {
      return () => {
        queryClient.setQueryData(ordersQuery.queryKey, (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            pages: oldData.pages.slice(0, 1),
            pageParams: oldData.pageParams.slice(0, 1),
          };
        });
      };
    },
    [queryClient],
  );
};
