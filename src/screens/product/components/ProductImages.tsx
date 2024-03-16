import type { ImageConnection } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { memo } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';

type Props = { images: ImageConnection };

export const ProductImages = memo(({ images }: Props) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      maximumZoomScale={2}
      minimumZoomScale={1}
    >
      {images.edges.map((imageEdge) => (
        <Image
          key={imageEdge.node.url}
          source={imageEdge.node.url}
          style={{ width: windowWidth, height: windowWidth }}
        />
      ))}
    </ScrollView>
  );
});

ProductImages.displayName = 'ProductImages';
