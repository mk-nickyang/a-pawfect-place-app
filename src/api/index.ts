import * as Sentry from '@sentry/react-native';
import axios from 'axios';

import { SHOPIFY_STOREFRONT_API_URL } from '@/config';

const shopifyClient = axios.create({
  baseURL: SHOPIFY_STOREFRONT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  },
});

export const shopifyQuery = async <T>(query: string): Promise<{ data: T }> => {
  const response = await shopifyClient.post('', { query });
  return response.data;
};

export const logQueryError = (error: unknown) => {
  if (__DEV__) {
    console.log(error);
  } else {
    Sentry.captureException(error);
  }
};
