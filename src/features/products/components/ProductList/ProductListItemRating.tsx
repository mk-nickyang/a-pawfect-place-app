import { memo } from 'react';

import { useProductReviews } from '../../api/useProductReviews';
import { calculateAverageRating } from '../../api/utils';

import { Box } from '@/components/Box';
import { Rating } from '@/components/Rating';
import { Text } from '@/components/Text';

type Props = { productId: string };

export const ProductListItemRating = memo(({ productId }: Props) => {
  const { data: reviews } = useProductReviews(productId);

  if (!reviews?.length) return;

  const avgRating = calculateAverageRating(reviews);

  return (
    <Box flexDirection="row" alignItems="center" pt="xs" g="xs">
      <Rating value={avgRating} />

      <Text variant="caption">{avgRating.toFixed(1)}</Text>
    </Box>
  );
});

ProductListItemRating.displayName = 'ProductListItemRating';
