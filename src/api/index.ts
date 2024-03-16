import * as Sentry from '@sentry/react-native';
import axios from 'axios';

const shopifyClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SHOPIFY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  },
});

export const shopifyQuery = async <T>(query: string): Promise<{ data: T }> => {
  try {
    const response = await shopifyClient.post('', { query });
    return response.data;
  } catch (error) {
    console.log('GraphQL Query Error: ', error.response);
    Sentry.captureException(error);
  }
};
