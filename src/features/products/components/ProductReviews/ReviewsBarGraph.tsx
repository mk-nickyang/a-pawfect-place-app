import type { ProductReview } from '../../api/types';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import type { ArrayElement } from '@/types/utils';

const RATINGS = [5, 4, 3, 2, 1] as const;

type Props = { reviews: ProductReview[] };

type ReviewRating = ArrayElement<typeof RATINGS>;

export const ReviewsBarGraph = ({ reviews }: Props) => {
  const reviewsCountByRating: Record<ReviewRating, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  for (const review of reviews) {
    const rating = Math.floor(review.rating) as ReviewRating;
    reviewsCountByRating[rating] += 1;
  }

  return (
    <Box pt="m" pb="xl">
      {RATINGS.map((rating) => {
        const percent = (reviewsCountByRating[rating] / reviews.length) * 100;
        return (
          <Box key={rating} flexDirection="row" alignItems="center" g="m">
            <Text fontWeight="600">{rating}</Text>
            <RatingBar percent={percent} />
          </Box>
        );
      })}
    </Box>
  );
};

type RatingBarProps = {
  percent: number; // Out of 100, e.g. 50
};

const RatingBar = ({ percent }: RatingBarProps) => {
  return (
    <Box
      flex={1}
      height={6}
      borderRadius={9}
      backgroundColor="secondaryBackground"
    >
      <Box
        width={`${percent}%`}
        height="100%"
        borderRadius={9}
        backgroundColor="contentPrimary"
      />
    </Box>
  );
};
