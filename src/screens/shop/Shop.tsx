import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useCollection } from './api/useCollection/useCollection';
import { CollectionProduct } from './components/CollectionProduct/CollectionProduct';

import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: ProductEdge) => item.node.id;

const renderItem: ListRenderItem<ProductEdge> = ({ item }) => (
  <CollectionProduct product={item.node} />
);

export const Shop = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCollection();

  const fetchNextCollectionProductsPage = useEvent(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <FlashList
      numColumns={2}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={250}
      onEndReached={fetchNextCollectionProductsPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={hasNextPage ? ListFooter : null}
    />
  );
};

const ListFooter = () => (
  <View style={styles.footer}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
