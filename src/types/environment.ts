export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN: string;
      EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
      EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL: string;
      EXPO_PUBLIC_SENTRY_DSN: string;
    }
  }
}
