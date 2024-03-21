import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import { SHOPIFY_SHOP_ID } from '@/config';

type AuthTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
};

type CustomerAccountAPIAccessTokenResponse = {
  access_token: string;
  expires_in: number;
};

const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL = `https://shopify.com/${SHOPIFY_SHOP_ID}/auth/oauth/authorize`;
const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL =
  'https://a-pawfect-place-oauth2-callback.vercel.app';
const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL = `${SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL}/token`;

const ACCESS_TOKEN_STORAGE_KEY = 'auth.access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'auth.refresh_token';
const ID_TOKEN_STORAGE_KEY = 'auth.id_token';

export const Auth = {
  /** @see https://shopify.dev/docs/api/customer#step-authorization */
  generateLoginUrl: async () => {
    const authorizationRequestUrl = new URL(SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL);

    authorizationRequestUrl.searchParams.append(
      'scope',
      'openid email https://api.customers.com/auth/customer.graphql',
    );

    authorizationRequestUrl.searchParams.append(
      'client_id',
      process.env.EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID || '',
    );

    authorizationRequestUrl.searchParams.append('response_type', 'code');

    authorizationRequestUrl.searchParams.append(
      'redirect_uri',
      SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL,
    );

    authorizationRequestUrl.searchParams.append('state', generateState());

    authorizationRequestUrl.searchParams.append('nonce', generateNonce(32));

    return authorizationRequestUrl.toString();
  },
  /** @see https://shopify.dev/docs/api/customer#step-obtain-access-token */
  fetchAuthToken: async (code: string) => {
    const body = new URLSearchParams();
    body.append('code', code);

    const authToken =
      await shopifyCustomerAccountTokenRequest<AuthTokenResponse>(body);

    await Auth.storeAuthToken(authToken);

    return authToken;
  },
  storeAuthToken: ({
    access_token,
    refresh_token,
    id_token,
  }: AuthTokenResponse) => {
    return Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, access_token),
      SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refresh_token),
      SecureStore.setItemAsync(ID_TOKEN_STORAGE_KEY, id_token),
    ]);
  },
  /** @see https://shopify.dev/docs/api/customer#step-using-refresh-token */
  refreshAccessToken: async (refreshToken: string) => {
    const body = new URLSearchParams();
    body.append('refresh_token', refreshToken);

    const authToken =
      await shopifyCustomerAccountTokenRequest<AuthTokenResponse>(body);

    await Auth.storeAuthToken(authToken);

    return authToken;
  },
  getAccessToken: async () => {
    const storedAccessToken = SecureStore.getItem(ACCESS_TOKEN_STORAGE_KEY);
    const storedRefreshToken = SecureStore.getItem(REFRESH_TOKEN_STORAGE_KEY);
    const storedIdToken = SecureStore.getItem(ID_TOKEN_STORAGE_KEY);

    if (!storedAccessToken || !storedRefreshToken || !storedIdToken) return;

    const idTokenPayload = jwtDecode(storedIdToken);
    // Use the stored token if not expired
    if (idTokenPayload.exp && idTokenPayload.exp * 1000 > Date.now()) {
      return storedAccessToken;
    }

    // Refresh access token if expired
    const { access_token: newAccessToken } =
      await Auth.refreshAccessToken(storedRefreshToken);
    return newAccessToken;
  },
  /** @see https://shopify.dev/docs/api/customer#step-use-access-token */
  fetchCustomerAccountAPIAccessToken: async () => {
    const accessToken = await Auth.getAccessToken();
    if (!accessToken) return;

    const body = new URLSearchParams();
    body.append('subject_token', accessToken);

    const customerAccountAPIToken =
      await shopifyCustomerAccountTokenRequest<CustomerAccountAPIAccessTokenResponse>(
        body,
      );

    return customerAccountAPIToken.access_token;
  },
};

function generateState() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

function generateNonce(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
}

async function shopifyCustomerAccountTokenRequest<T>(
  body: URLSearchParams,
): Promise<T> {
  const response = await axios.post(
    SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL,
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return response.data;
}
