import { ColorScheme, type Configuration } from '@shopify/checkout-sheet-kit';

import theme from '@/theme';

export const WEBSITE_URL = 'https://apawfectplace.com.au';

const SHOPIFY_SHOP_ID = '50403049658';
export const SHOPIFY_STOREFRONT_API_URL =
  'https://a-pawfect-place.myshopify.com/api/2024-01/graphql.json';
export const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/auth/oauth/authorize`;

export const shopifyCheckoutConfig: Configuration = {
  colorScheme: ColorScheme.automatic,
  colors: {
    ios: {
      spinnerColor: theme.colors.contentPrimary,
      backgroundColor: theme.colors.mainBackground,
    },
    android: {
      light: {
        backgroundColor: theme.colors.mainBackground,
        spinnerColor: theme.colors.contentPrimary,
        headerBackgroundColor: theme.colors.mainBackground,
        headerTextColor: theme.colors.contentPrimary,
      },
      dark: {
        backgroundColor: theme.colors.contentPrimary,
        spinnerColor: theme.colors.contentInverse,
        headerBackgroundColor: theme.colors.contentPrimary,
        headerTextColor: theme.colors.contentInverse,
      },
    },
  },
};
