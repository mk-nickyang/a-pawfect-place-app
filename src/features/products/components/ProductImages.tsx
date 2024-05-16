import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type {
  ImageConnection,
  ImageEdge,
} from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import {
  type RefObject,
  memo,
  useCallback,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

type Props = { images: ImageConnection };

const keyExtractor = (item: ImageEdge) => item.node.url;

export const ProductImages = memo(({ images }: Props) => {
  const imagesListIndicatorRef = useRef<ImagesListIndicatorRef>(null);

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

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const index = Math.floor(scrollX / windowWidth);
      imagesListIndicatorRef.current?.setCurrentIndex(index);
    },
    [windowWidth],
  );

  return (
    <Box>
      <FlashList
        pagingEnabled
        horizontal
        data={images.edges}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={windowWidth}
        showsHorizontalScrollIndicator={false}
        maximumZoomScale={3}
        minimumZoomScale={1}
        bouncesZoom={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <ImagesListIndicator
        listIndicatorRef={imagesListIndicatorRef}
        listLength={images.edges.length}
      />
    </Box>
  );
});

ProductImages.displayName = 'ProductImages';

// ImagesListIndicator
type ImagesListIndicatorRef = { setCurrentIndex: (newIndex: number) => void };

type ImagesListIndicatorProps = {
  listIndicatorRef: RefObject<ImagesListIndicatorRef>;
  listLength: number;
};

const ImagesListIndicator = ({
  listIndicatorRef,
  listLength,
}: ImagesListIndicatorProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useImperativeHandle(listIndicatorRef, () => ({
    setCurrentIndex: setCurrentImageIndex,
  }));

  return (
    <Box
      pointerEvents="none"
      position="absolute"
      top={10}
      right={10}
      py="xs"
      px="s"
      borderRadius={15}
      flexDirection="row"
      backgroundColor="backdropBackground"
    >
      <Text color="contentInverse">{currentImageIndex + 1}/</Text>
      <Text color="contentInverse">{listLength}</Text>
    </Box>
  );
};
