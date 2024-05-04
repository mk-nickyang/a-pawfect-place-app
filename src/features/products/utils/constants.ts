import type { ProductCollectionSortKeys } from '@shopify/hydrogen-react/storefront-api-types';

export const ProductListSortId = {
  BEST_SELLING: 'BEST_SELLING',
  CREATED: 'CREATED',
  TITLE_ASC: 'TITLE_ASC',
  TITLE_DESC: 'TITLE_DESC',
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  RELEVANCE: 'RELEVANCE',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProductListSortId = keyof typeof ProductListSortId;

export const PRODUCT_LIST_SORTER_BY_ID: Record<
  ProductListSortId,
  { label: string; sortKey: ProductCollectionSortKeys; reverse: boolean }
> = {
  BEST_SELLING: {
    label: 'Best Selling',
    sortKey: 'BEST_SELLING',
    reverse: false,
  },
  CREATED: { label: 'New Arrivals', sortKey: 'CREATED', reverse: false },
  TITLE_ASC: {
    label: 'Product Title (A to Z)',
    sortKey: 'TITLE',
    reverse: false,
  },
  TITLE_DESC: {
    label: 'Product Title (Z to A)',
    sortKey: 'TITLE',
    reverse: true,
  },
  PRICE_ASC: { label: 'Price (high to low)', sortKey: 'PRICE', reverse: false },
  PRICE_DESC: { label: 'Price (low to high)', sortKey: 'PRICE', reverse: true },
  RELEVANCE: { label: 'Relevance', sortKey: 'RELEVANCE', reverse: false },
};
