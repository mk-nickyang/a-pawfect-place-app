import type { ProductFilter } from '@shopify/hydrogen-react/storefront-api-types';

import { ProductReview } from './types';

export const parseProductFilterGQLQueryString = (filters: ProductFilter) => {
  const availableFilterString = filters.available ? '{ available: true }' : '';

  const minPrice = filters.price?.min;
  const maxPrice = filters.price?.max;
  if (!minPrice && !maxPrice) return availableFilterString;

  let priceFilterString = '';
  if (minPrice && maxPrice) {
    priceFilterString = `{ price: { min: ${minPrice}, max: ${maxPrice} } }`;
  } else if (minPrice) {
    priceFilterString = `{ price: { min: ${minPrice} } }`;
  } else if (maxPrice) {
    priceFilterString = `{ price: { max: ${maxPrice} } }`;
  }

  if (!availableFilterString) return priceFilterString;
  return `${availableFilterString}, ${priceFilterString}`;
};

export const calculateAverageRating = (reviews: ProductReview[]): number => {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};
