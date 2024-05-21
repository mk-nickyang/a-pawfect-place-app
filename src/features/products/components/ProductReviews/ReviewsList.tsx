import { useState } from 'react';

import { ReviewPictures } from './ReviewPictures';
import type { ProductReview } from '../../api/types';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Rating } from '@/components/Rating';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';
import { formatDate } from '@/utils/date';

type Props = { reviews: ProductReview[]; scrollToReviews: () => void };

const REVIEWS_PAGE_SIZE = 5;

export const ReviewsList = ({ reviews, scrollToReviews }: Props) => {
  const [pageIndex, setPageIndex] = useState(0);

  const { colors } = useTheme();

  const onPageChange = (pageChangeValue: number) => {
    setPageIndex((prev) => prev + pageChangeValue);
    scrollToReviews();
  };

  const sortedReviews = [...reviews].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const slicedReviews = sortedReviews.slice(
    pageIndex * REVIEWS_PAGE_SIZE,
    (pageIndex + 1) * REVIEWS_PAGE_SIZE,
  );

  const numberOfPages = Math.ceil(sortedReviews.length / REVIEWS_PAGE_SIZE);

  return (
    <Box>
      {slicedReviews.map((review) => (
        <Box key={review.id} mb="xl">
          <Rating value={review.rating} />

          <Box flexDirection="row" g="xs" pt="xs" pb="s">
            <Text color="contentSecondary">
              {review.reviewerName || 'Customer'}
            </Text>
            <Text>·</Text>
            <Text color="contentSecondary">
              {formatDate(review.created_at)}
            </Text>
          </Box>

          {review.title?.trim() ? (
            <Text fontWeight="600">{review.title}</Text>
          ) : null}

          <Text>{review.body}</Text>

          {review.pictures?.length ? (
            <ReviewPictures pictures={review.pictures} />
          ) : null}
        </Box>
      ))}

      {numberOfPages > 1 ? (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          g="m"
        >
          <PressableOpacity
            disabled={pageIndex <= 0}
            onPress={() => onPageChange(-1)}
          >
            <Box p="s" borderColor="borderPrimary" borderWidth={1}>
              <Icon
                name="chevron-left"
                size={24}
                color={
                  pageIndex <= 0
                    ? colors.contentSecondary
                    : colors.contentPrimary
                }
              />
            </Box>
          </PressableOpacity>

          <Text>
            {pageIndex + 1} of {numberOfPages}
          </Text>

          <PressableOpacity
            disabled={pageIndex >= numberOfPages - 1}
            onPress={() => onPageChange(1)}
          >
            <Box p="s" borderColor="borderPrimary" borderWidth={1}>
              <Icon
                name="chevron-right"
                size={24}
                color={
                  pageIndex >= numberOfPages - 1
                    ? colors.contentSecondary
                    : colors.contentPrimary
                }
              />
            </Box>
          </PressableOpacity>
        </Box>
      ) : null}
    </Box>
  );
};
