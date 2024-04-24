import axios from 'axios';

import { SHOPIFY_SHOP_SLUG, SHOPIFY_SHOP_ID } from '@/config';
import { Auth } from '@/modules/auth';

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_SHOP_SLUG}.myshopify.com/api/2024-01/graphql.json`;
const SHOPIFY_CUSTOMER_ACCOUNT_API_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2023-10/graphql`;

/**
 * Storefront API
 * @see https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/
 */
const shopifyStorefrontAPI = axios.create({
  baseURL: SHOPIFY_STOREFRONT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  },
});

export const shopifyStorefrontQuery = async <T>(
  query: string,
): Promise<{ data: T }> => {
  const response = await shopifyStorefrontAPI.post('', { query });
  return response.data;
};

/**
 * Customer Account API
 *
 * @see https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/getting-started
 */
export const shopifyCustomerAccountQuery = async <T>(
  query: string,
): Promise<{ data: T }> => {
  const apiAccessToken = await Auth.fetchCustomerAccountAPIAccessToken();

  const response = await axios.post(
    SHOPIFY_CUSTOMER_ACCOUNT_API_URL,
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiAccessToken,
      },
    },
  );

  return response.data;
};
