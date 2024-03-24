import { FlashList, ListRenderItem } from '@shopify/flash-list';

import type { CustomerOrderEdge } from './api/types';
import { useOrders } from './api/useOrders';
import { useResetOrdersQueryPagination } from './api/useResetOrdersQueryPagination';
import { OrderListItem } from './components/OrderListItem';

import { Box } from '@/components/Box';
import { Divider } from '@/components/Divider';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: CustomerOrderEdge) => item.node.id;

const renderItem: ListRenderItem<CustomerOrderEdge> = ({ item }) => (
  <OrderListItem order={item.node} />
);

export const Orders = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useOrders();

  const fetchNextCollectionProductsPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  useResetOrdersQueryPagination();

  if (isLoading) return <Loading height="100%" />;

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={150}
        ItemSeparatorComponent={Divider}
        onEndReached={fetchNextCollectionProductsPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={hasNextPage ? ListFooter : null}
      />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;
