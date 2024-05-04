import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { ProductListItem } from './ProductListItem';

import { Loading } from '@/components/Loading';
import theme from '@/theme';

const keyExtractor = (item: ProductEdge) => item.node.id;

const renderItem: ListRenderItem<ProductEdge> = ({ item, index }) => (
  <ProductListItem
    product={item.node}
    badgeTopOffset={12}
    badgeRightOffset={index % 2 === 0 ? 12 : 20}
    style={index % 2 === 0 ? styles.leftListItem : styles.rightListItem}
  />
);

type Props = {
  data: ProductEdge[];
  hasNextPage: boolean;
  onRefresh: () => Promise<unknown>;
  onEndReached: () => void;
};

export const ProductList = memo(
  ({ data, hasNextPage, onRefresh, onEndReached }: Props) => {
    /**
     * Use `isRefetching` from `useQuery` will cause RefreshControl component flickering,
     * use local state here as a workaround.
     * @see https://github.com/TanStack/query/issues/2380
     */
    const [isRefetching, setIsRefetching] = useState(false);

    const refetchProductsList = useCallback(async () => {
      setIsRefetching(true);
      await onRefresh();
      setIsRefetching(false);
    }, [onRefresh]);

    return (
      <FlashList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={260}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetchProductsList}
        ListFooterComponent={hasNextPage ? ListFooter : null}
        contentContainerStyle={styles.list}
      />
    );
  },
);

ProductList.displayName = 'ProductList';

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
