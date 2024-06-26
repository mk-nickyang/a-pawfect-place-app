import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

import { ordersQuery } from '../api/ordersQuery';
import type { OrderEdge } from '../api/types';
import { useOrders } from '../api/useOrders';
import { OrderListItem } from '../components/OrderListItem';

import { Box } from '@/components/Box';
import { Divider } from '@/components/Divider';
import { Loading } from '@/components/Loading';
import { RefreshControl } from '@/components/RefreshControl';
import { Text } from '@/components/Text';
import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: OrderEdge) => item.node.id;

const renderItem: ListRenderItem<OrderEdge> = ({ item }) => (
  <OrderListItem order={item.node} />
);

export const Orders = () => {
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
    /**
     * Reset infinite query pagination before refetch to avoid overwhelming network requests
     * @see https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries#what-happens-when-an-infinite-query-needs-to-be-refetched
     */
    resetOrdersQueryPagination();

    await refetch();
  }, [refetch, resetOrdersQueryPagination]);

  useEffect(
    function resetOrdersQueryPaginationOnUnmount() {
      return () => {
        resetOrdersQueryPagination();
      };
    },
    [resetOrdersQueryPagination],
  );

  const refreshControl = useMemo(
    () => <RefreshControl onRefresh={refetchOrdersList} />,
    [refetchOrdersList],
  );

  if (isLoading) return <Loading height="100%" />;

  if (!data?.length)
    return (
      <Box p="m">
        <Text variant="body1">No orders found.</Text>
      </Box>
    );

  return (
    <Box flex={1} backgroundColor="screenBackground">
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={150}
        ItemSeparatorComponent={Divider}
        onEndReached={fetchNextOrdersPage}
        onEndReachedThreshold={0.5}
        refreshControl={refreshControl}
        ListFooterComponent={hasNextPage ? ListFooter : null}
      />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;
