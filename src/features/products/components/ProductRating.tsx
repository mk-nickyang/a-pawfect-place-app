import { memo } from 'react';

import { useProductReviews } from '../api/useProductReviews';
import { calculateAverageRating } from '../api/utils';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Rating } from '@/components/Rating';
import { Text } from '@/components/Text';

type Props = { productId: string; onPress: () => void };

export const ProductRating = memo(({ productId, onPress }: Props) => {
  const { data: reviews } = useProductReviews(productId);

  if (!reviews?.length) return;

  const avgRating = calculateAverageRating(reviews);

  return (
    <Box alignItems="flex-start">
      <PressableOpacity hitSlop={10} onPress={onPress}>
        <Box flexDirection="row" alignItems="center" pt="xs" g="xs">
          <Rating value={avgRating} size="large" />

          <Text variant="body1">{avgRating.toFixed(1)}</Text>
        </Box>
      </PressableOpacity>
    </Box>
  );
});

ProductRating.displayName = 'ProductRating';
