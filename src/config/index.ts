import { ColorScheme, type Configuration } from '@shopify/checkout-sheet-kit';

import theme from '@/theme';

export const SHOPIFY_SHOP_ID = '50403049658';
export const SHOPIFY_SHOP_SLUG = 'a-pawfect-place';

export const shopifyCheckoutConfig: Configuration = {
  preloading: true,
  colorScheme: ColorScheme.automatic,
  colors: {
    ios: {
      tintColor: theme.colors.contentPrimary,
      backgroundColor: theme.colors.mainBackground,
    },
    android: {
      light: {
        backgroundColor: theme.colors.mainBackground,
        progressIndicator: theme.colors.contentPrimary,
        headerBackgroundColor: theme.colors.mainBackground,
        headerTextColor: theme.colors.contentPrimary,
      },
      dark: {
        backgroundColor: theme.colors.contentPrimary,
        progressIndicator: theme.colors.contentInverse,
        headerBackgroundColor: theme.colors.contentPrimary,
        headerTextColor: theme.colors.contentInverse,
      },
    },
  },
};
