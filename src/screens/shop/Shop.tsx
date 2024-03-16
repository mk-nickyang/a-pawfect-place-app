import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';

import { useCollection } from './api/useCollection';
import { CollectionProduct } from './components/CollectionProduct';

import { Loading } from '@/components/Loading';
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

const ListFooter = () => <Loading height={50} />;
