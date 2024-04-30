import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

import { PersistedStorage } from '@/modules/storage';
import { safeJSONParse } from '@/utils/misc';

export const RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY =
  'products.recently_viewed_products';

export const RecentlyViewedProductsStorage = {
  get: () => {
    const recentlyViewedProductsStorageString = PersistedStorage.getItem(
      RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY,
    );
    if (!recentlyViewedProductsStorageString) return [];

    const recentlyViewedProducts: Product[] = safeJSONParse(
      recentlyViewedProductsStorageString,
      [],
    );
    return recentlyViewedProducts;
  },
  add: (newProduct: Product) => {
    const currentRecentlyViewedProducts = RecentlyViewedProductsStorage.get();
    // Filter out duplicates
    const newRecentlyViewedProducts = currentRecentlyViewedProducts.filter(
      (recentlyViewedProducts) => recentlyViewedProducts.id !== newProduct.id,
    );
    // Only show max 5 (4 existing + 1 added) recently viewed products
    newRecentlyViewedProducts.splice(4);
    newRecentlyViewedProducts.unshift(newProduct);

    const newRecentlyViewedProductsStorageString = JSON.stringify(
      newRecentlyViewedProducts,
    );
    PersistedStorage.setItem(
      RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY,
      newRecentlyViewedProductsStorageString,
    );
  },
  clear: () => {
    PersistedStorage.removeItem(RECENTLY_VIEWED_PRODUCTS_STORAGE_KEY);
  },
};
