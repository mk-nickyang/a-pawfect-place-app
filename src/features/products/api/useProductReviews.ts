import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

import type { ProductReviewsByProductId } from './types';

import { Logger } from '@/modules/logger';
import { fromGlobalId } from '@/utils/misc';

const fetchProductsReviews = async () => {
  try {
    const response = await axios.get(
      process.env.EXPO_PUBLIC_JUDGE_ME_REVIEWS_API,
    );
    return response.data as ProductReviewsByProductId;
  } catch (error) {
    Logger.error(error);
  }
};

export const useProductReviews = (productGlobalId: string) => {
  const productId = fromGlobalId(productGlobalId);

  return useQuery({
    queryFn: fetchProductsReviews,
    queryKey: ['products-reviews'],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    select: useCallback(
      (data: ProductReviewsByProductId | undefined) =>
        productId && data ? data[productId] : undefined,
      [productId],
    ),
  });
};
