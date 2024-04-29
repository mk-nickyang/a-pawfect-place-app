import type { MoneyV2 } from '@shopify/hydrogen-react/storefront-api-types';

export const formatPrice = (
  price?: MoneyV2 | null,
  options?: { currencyCode?: boolean },
) => {
  if (!price?.amount) return '';
  const numericAmount = parseFloat(price.amount);
  return `$${(Math.round(numericAmount * 100) / 100).toFixed(2)}${options?.currencyCode ? ` ${price.currencyCode}` : ''}`;
};
