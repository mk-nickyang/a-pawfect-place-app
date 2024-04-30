import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { productsQuery } from '../api/productsQuery';
import { useProducts } from '../api/useProducts';
import { ProductListItem } from '../components/ProductListItem';
import { ProductsSearchBar } from '../components/ProductsSearch/ProductsSearchBar';
import { ProductsSearchOverlay } from '../components/ProductsSearch/ProductsSearchOverlay';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';
import theme from '@/theme';

const keyExtractor = (item: ProductEdge) => item.node.id;

const renderItem: ListRenderItem<ProductEdge> = ({ item, index }) => (
  <ProductListItem
    product={item.node}
    badgeRightOffset={index % 2 === 0 ? 0 : 8}
    style={index % 2 === 0 ? styles.leftListItem : styles.rightListItem}
  />
);

export const Products = () => {
  /**
   * Use `isRefetching` from `useQuery` will cause RefreshControl component flickering,
   * use local state here as a workaround.
   * @see https://github.com/TanStack/query/issues/2380
   */
  const [isRefetching, setIsRefetching] = useState(false);

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
        estimatedItemSize={260}
        onEndReached={fetchNextCollectionProductsPage}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetchProductsList}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={ProductsSearchBar}
        ListFooterComponent={hasNextPage ? ListFooter : null}
        contentContainerStyle={styles.list}
      />

      <ProductsSearchOverlay />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;

const styles = StyleSheet.create({
  list: {
    paddingBottom: theme.spacing.s,
  },
  leftListItem: {
    flex: 1,
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.s,
    paddingVertical: theme.spacing.s,
  },
  rightListItem: {
    flex: 1,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
});
