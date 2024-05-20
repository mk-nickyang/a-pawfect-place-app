import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import {
  type RefObject,
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

type Props = { imageUrls: string[]; initialImageIndex?: number };

const keyExtractor = (item: string) => item;

export const ImagesCarousel = ({ imageUrls, initialImageIndex }: Props) => {
  const imagesListIndicatorRef = useRef<ImagesListIndicatorRef>(null);

  const { width: windowWidth } = useWindowDimensions();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <Image
        source={item}
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
        data={imageUrls}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialScrollIndex={initialImageIndex}
        estimatedItemSize={windowWidth}
        showsHorizontalScrollIndicator={false}
        maximumZoomScale={3}
        minimumZoomScale={1}
        bouncesZoom={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <ImagesListIndicator
        listIndicatorRef={imagesListIndicatorRef}
        listLength={imageUrls.length}
        initialImageIndex={initialImageIndex}
      />
    </Box>
  );
};

ImagesCarousel.displayName = 'ImagesCarousel';

// ImagesListIndicator
type ImagesListIndicatorRef = { setCurrentIndex: (newIndex: number) => void };

type ImagesListIndicatorProps = {
  listIndicatorRef: RefObject<ImagesListIndicatorRef>;
  listLength: number;
  initialImageIndex?: number;
};

const ImagesListIndicator = ({
  listIndicatorRef,
  listLength,
  initialImageIndex,
}: ImagesListIndicatorProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    initialImageIndex ?? 0,
  );

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
