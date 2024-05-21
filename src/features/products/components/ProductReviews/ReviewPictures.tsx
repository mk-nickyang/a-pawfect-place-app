import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import type { ProductReviewPicture } from '../../api/types';

import { Box } from '@/components/Box';
import { ImagesModal } from '@/components/ImagesModal';
import { PressableOpacity } from '@/components/PressableOpacity';
import { spacing } from '@/theme';

type Props = { pictures: ProductReviewPicture[] };

const REVIEW_PICTURE_SIZE = 120;

const keyExtractor = (item: ProductReviewPicture) => item.urls.original;

export const ReviewPictures = ({ pictures }: Props) => {
  const [openImageIndex, setOpenImageIndex] = useState<number | undefined>(
    undefined,
  );

  const renderItem: ListRenderItem<ProductReviewPicture> = useCallback(
    ({ item, index }) => (
      <PictureListItem
        imageUrl={item.urls.compact}
        onPress={() => setOpenImageIndex(index)}
      />
    ),
    [],
  );

  return (
    <>
      <FlashList
        pagingEnabled
        horizontal
        data={pictures}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={REVIEW_PICTURE_SIZE}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ListItemSeparator}
        contentContainerStyle={styles.list}
      />

      <ImagesModal
        openImageIndex={openImageIndex}
        onClose={() => setOpenImageIndex(undefined)}
        imageUrls={pictures.map((pic) => pic.urls.original)}
      />
    </>
  );
};

const ListItemSeparator = () => <Box width={spacing.s} />;

type PictureListItemProps = { imageUrl: string; onPress: () => void };

const PictureListItem = ({ imageUrl, onPress }: PictureListItemProps) => {
  return (
    <PressableOpacity onPress={onPress}>
      <Image source={imageUrl} style={styles.image} />
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.s,
  },
  image: {
    width: REVIEW_PICTURE_SIZE,
    height: REVIEW_PICTURE_SIZE,
    borderRadius: 6,
  },
});
