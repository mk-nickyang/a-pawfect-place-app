import { RefObject, memo } from 'react';
import { View } from 'react-native';

import { ReviewsBarGraph } from './ReviewsBarGraph';
import { ReviewsList } from './ReviewsList';
import type { ProductReview } from '../../api/types';
import { useProductReviews } from '../../api/useProductReviews';
import { calculateAverageRating } from '../../api/utils';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

type ProductReviewsViewProps = {
  reviews: ProductReview[];
  productReviewsRef: RefObject<View>;
  scrollToReviews: () => void;
};

const ProductReviewsView = ({
  reviews,
  productReviewsRef,
  scrollToReviews,
}: ProductReviewsViewProps) => {
  const { colors } = useTheme();

  const avgRating = calculateAverageRating(reviews);

  return (
    <Box ref={productReviewsRef} pb="xl">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="h2">
          Reviews{' '}
          <Text variant="h3" color="contentSecondary">
            ({reviews.length})
          </Text>
        </Text>

        <Box flexDirection="row" alignItems="center" g="xs">
          <Icon name="star" size={24} color={colors.ratingBackground} />
          <Text variant="h2">{avgRating.toFixed(1)}</Text>
        </Box>
      </Box>

      <ReviewsBarGraph reviews={reviews} />

      <ReviewsList reviews={reviews} scrollToReviews={scrollToReviews} />
    </Box>
  );
};

type Props = {
  productId: string;
  productReviewsRef: RefObject<View>;
  scrollToReviews: () => void;
};

export const ProductReviews = memo(
  ({ productId, productReviewsRef, scrollToReviews }: Props) => {
    const { data: reviews } = useProductReviews(productId);

    if (!reviews?.length) return;

    return (
      <ProductReviewsView
        reviews={reviews}
        productReviewsRef={productReviewsRef}
        scrollToReviews={scrollToReviews}
      />
    );
  },
);

ProductReviews.displayName = 'ProductReviews';
