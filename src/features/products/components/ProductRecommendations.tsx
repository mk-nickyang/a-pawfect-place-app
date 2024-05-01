import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { memo } from 'react';
import { FlatList, type ListRenderItem, StyleSheet } from 'react-native';

import { ProductListItem } from './ProductList/ProductListItem';
import { useProductRecommendations } from '../api/useProductRecommendations';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import theme from '@/theme';

type Props = { productId: string };

const RECOMMENDED_PRODUCT_ITEM_WIDTH = 200;

const keyExtractor = (item: Product) => item.id;

const renderItem: ListRenderItem<Product> = ({ item }) => (
  <ProductListItem product={item} style={styles.listItem} />
);

export const ProductRecommendations = memo(({ productId }: Props) => {
  const { data: products } = useProductRecommendations(productId);

  if (!products?.length) return null;

  return (
    <Box pb="l">
      <Text variant="h2" mb="m">
        You may also like
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ListItemSeparator}
        initialNumToRender={2}
      />
    </Box>
  );
});

const ListItemSeparator = () => <Box width={theme.spacing.m} />;

ProductRecommendations.displayName = 'ProductRecommendations';

const styles = StyleSheet.create({
  listItem: {
    width: RECOMMENDED_PRODUCT_ITEM_WIDTH,
  },
});
