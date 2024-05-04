import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { memo } from 'react';
import { FlatList, type ListRenderItem, StyleSheet } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';

import {
  RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY,
  RecentlyViewedProductsStorage,
} from '../../modules/recentlyViewedProducts';
import { ProductListItem } from '../ProductList/ProductListItem';

import { Box } from '@/components/Box';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Text } from '@/components/Text';
import theme from '@/theme';

const RECENTLY_VIEWED_PRODUCT_ITEM_WIDTH = 200;

const keyExtractor = (item: Product) => item.id;

const renderItem: ListRenderItem<Product> = ({ item }) => (
  <ProductListItem product={item} style={styles.listItem} />
);

export const RecentlyViewedProducts = memo(() => {
  const [recentlyViewedProducts] = useMMKVObject<Product[]>(
    RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY,
  );

  if (!recentlyViewedProducts?.length) return null;

  return (
    <ErrorBoundary
      /**
       * If this ErrorBoundary gets triggered, it will be most likely due to incorrect data in RecentlyViewedProductsStorage,
       * thus clear storage to prevent the same error triggered again.
       */
      onError={() => RecentlyViewedProductsStorage.clear()}
    >
      <Box mb="l">
        <Text variant="h2" mb="m">
          Recently viewed
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentlyViewedProducts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={ListItemSeparator}
          initialNumToRender={2}
        />
      </Box>
    </ErrorBoundary>
  );
});

const ListItemSeparator = () => <Box width={theme.spacing.m} />;

RecentlyViewedProducts.displayName = 'RecentlyViewedProducts';

const styles = StyleSheet.create({
  listItem: {
    width: RECENTLY_VIEWED_PRODUCT_ITEM_WIDTH,
  },
});
