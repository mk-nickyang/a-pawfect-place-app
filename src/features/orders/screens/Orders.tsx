import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { ordersQuery } from '../api/ordersQuery';
import type { OrderEdge } from '../api/types';
import { useOrders } from '../api/useOrders';
import { OrderListItem } from '../components/OrderListItem';

import { Box } from '@/components/Box';
import { Divider } from '@/components/Divider';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: OrderEdge) => item.node.id;

const renderItem: ListRenderItem<OrderEdge> = ({ item }) => (
  <OrderListItem order={item.node} />
);

export const Orders = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useOrders();

  const queryClient = useQueryClient();

  const fetchNextOrdersPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  const resetOrdersQueryPagination = useCallback(() => {
    queryClient.setQueryData(ordersQuery.queryKey, (oldData) => {
      if (!oldData) return;
      return {
        ...oldData,
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
  }, [queryClient]);

  const refetchOrdersList = useCallback(async () => {
    setIsRefetching(true);
    /**
     * Reset infinite query pagination before refetch to avoid overwhelming network requests
     * @see https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries#what-happens-when-an-infinite-query-needs-to-be-refetched
     */
    resetOrdersQueryPagination();

    await refetch();

    setIsRefetching(false);
  }, [refetch, resetOrdersQueryPagination]);

  useEffect(
    function resetOrdersQueryPaginationOnUnmount() {
      return () => {
        resetOrdersQueryPagination();
      };
    },
    [resetOrdersQueryPagination],
  );

  if (isLoading) return <Loading height="100%" />;

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={150}
        ItemSeparatorComponent={Divider}
        onEndReached={fetchNextOrdersPage}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetchOrdersList}
        ListFooterComponent={hasNextPage ? ListFooter : null}
      />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;
