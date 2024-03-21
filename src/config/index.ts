import { ColorScheme, type Configuration } from '@shopify/checkout-sheet-kit';

import theme from '@/theme';

const SHOPIFY_SHOP_ID = '50403049658';
const SHOPIFY_SHOP_SLUG = 'a-pawfect-place';
export const SHOPIFY_WEBSITE_URL = 'https://apawfectplace.com.au';

export const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_SHOP_SLUG}.myshopify.com/api/2024-01/graphql.json`;

export const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/auth/oauth/authorize`;
export const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/auth/oauth/token`;
export const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_LOGOUT_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/auth/logout`;

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
