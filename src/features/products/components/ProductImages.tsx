import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type {
  ImageConnection,
  ImageEdge,
} from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

type Props = { images: ImageConnection };

const keyExtractor = (item: ImageEdge) => item.node.url;

export const ProductImages = memo(({ images }: Props) => {
  const { width: windowWidth } = useWindowDimensions();

  const renderItem: ListRenderItem<ImageEdge> = useCallback(
    ({ item }) => (
      <Image
        source={item.node.url}
        style={{ width: windowWidth, height: windowWidth }}
      />
    ),
    [windowWidth],
  );

  return (
    <FlashList
      pagingEnabled
      horizontal
      data={images.edges}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      estimatedItemSize={windowWidth}
      showsHorizontalScrollIndicator={false}
      maximumZoomScale={2}
      minimumZoomScale={1}
    />
  );
});

ProductImages.displayName = 'ProductImages';
