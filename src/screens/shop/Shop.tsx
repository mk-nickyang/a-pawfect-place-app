import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { useWindowDimensions } from 'react-native';

import { useCollection } from './api/useCollection';
import { CollectionProduct } from './components/CollectionProduct';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';

const keyExtractor = (item: ProductEdge) => item.node.id;

const renderItem: ListRenderItem<ProductEdge> = ({ item }) => (
  <CollectionProduct product={item.node} />
);

export const Shop = () => {
  const { width: windowWidth } = useWindowDimensions();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCollection();

  const fetchNextCollectionProductsPage = useEvent(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

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
        ListFooterComponent={hasNextPage ? ListFooter : null}
      />
    </Box>
  );
};

const ListFooter = () => <Loading height={50} />;
