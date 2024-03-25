import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { productsQuery } from './api/productsQuery';
import { useProducts } from './api/useProducts';
import { CollectionProduct } from './components/CollectionProduct';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: ProductEdge) => item.node.id;

const renderItem: ListRenderItem<ProductEdge> = ({ item }) => (
  <CollectionProduct product={item.node} />
);

export const Shop = () => {
  /**
   * Use `isRefetching` from `useQuery` will cause RefreshControl component flickering,
   * use local state here as a workaround.
   * @see https://github.com/TanStack/query/issues/2380
   */
  const [isRefetching, setIsRefetching] = useState(false);

  const { width: windowWidth } = useWindowDimensions();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useProducts();

  const queryClient = useQueryClient();

  const fetchNextCollectionProductsPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  const resetCollectionProductsQueryPagination = useCallback(() => {
    queryClient.setQueryData(productsQuery.queryKey, (oldData) => {
      if (!oldData) return;
      return {
        ...oldData,
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
  }, [queryClient]);

  const refetchProductsList = useCallback(async () => {
    setIsRefetching(true);
    /**
     * Reset infinite query pagination before refetch to avoid overwhelming network requests
     * @see https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries#what-happens-when-an-infinite-query-needs-to-be-refetched
     */
    resetCollectionProductsQueryPagination();

    await refetch();

    setIsRefetching(false);
  }, [refetch, resetCollectionProductsQueryPagination]);

  if (isLoading) return <Loading height="100%" />;

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <FlashList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={windowWidth / 2 + 112}
        onEndReached={fetchNextCollectionProductsPage}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetchProductsList}
        ListFooterComponent={hasNextPage ? ListFooter : null}
      />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;
