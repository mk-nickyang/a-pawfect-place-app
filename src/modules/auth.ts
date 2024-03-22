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
/**
 * Since Shopify only allows https OAuth callback url,
 * we created an intermediary web page in Next.js to handle the redirection.
 *
 * The Next.js page will
 * - Receive the OAuth2 code and other query parameters from the callback url
 * - Append all query parameters to the app deeplink URL (e.g. apawfectplace://)
 * - Redirect to the app
 *
 * When Shopify does support deeplink as the callback url in the future,
 * we can possibly utilize the expo-auth-session library to handle OAuth flow more seamlessly
 * @see https://docs.expo.dev/guides/authentication/
 */
const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL =
  process.env.EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL;
/**
 * Technically once we receive the OAuth code, we can use it to request the access token via
 * `POST https://shopify.com/<shop_id>/auth/oauth/token`
 * @see https://shopify.dev/docs/api/customer#step-obtain-access-token
 *
 * However, when we send the request from the React Native app, the Shopify token endpoint will always return 401 for some reason.
 * we guess it's something to do with the Public authentication and the Javascript origin block.
 * @see https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/getting-started#step-4-set-up-client-application-settings
 *
 * We also submitted a support ticket, hopefully can get some help one day.
 * @see https://community.shopify.com/c/hydrogen-headless-and-storefront/customer-account-api-obtain-access-token-from-react-native-app/td-p/2497245
 *
 * But as a workaround, we created an `/token` endpoint in the same Next.js application,
 * where we can safely store the Customer Account API secret and use the Confidential authentication.
 */
const SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL = `${SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL}/token`;

const ACCESS_TOKEN_STORAGE_KEY = 'auth.access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'auth.refresh_token';
const ID_TOKEN_STORAGE_KEY = 'auth.id_token';

export const Auth = {
  /**
   * Get a url that redirects customer to the Shopify login page
   * @see https://shopify.dev/docs/api/customer#step-authorization
   */
  generateLoginUrl: async () => {
    const authorizationRequestUrl = new URL(SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL);

    authorizationRequestUrl.searchParams.append(
      'scope',
      'openid email https://api.customers.com/auth/customer.graphql',
    );

    authorizationRequestUrl.searchParams.append(
      'client_id',
      process.env.EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID,
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
  /**
   * Fetch access token after successful login
   * @see https://shopify.dev/docs/api/customer#step-obtain-access-token
   */
  fetchAuthToken: async (code: string) => {
    const body = new URLSearchParams();
    body.append('code', code);

    const authToken =
      await shopifyCustomerAccountTokenRequest<AuthTokenResponse>(body);

    return authToken;
  },
  /**
   * Store access tokens securely
   * @see https://docs.expo.dev/guides/authentication/#storing-data
   */
  storeAuthToken: ({
    access_token,
    refresh_token,
    id_token,
  }: Pick<
    AuthTokenResponse,
    'access_token' | 'id_token' | 'refresh_token'
  >) => {
    return Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, access_token),
      SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refresh_token),
      SecureStore.setItemAsync(ID_TOKEN_STORAGE_KEY, id_token),
    ]);
  },
  /**
   * Use refresh token to request a new access token once expired
   * @see https://shopify.dev/docs/api/customer#step-using-refresh-token
   */
  refreshAccessToken: async (refreshToken: string) => {
    const body = new URLSearchParams();
    body.append('refresh_token', refreshToken);

    const authToken =
      await shopifyCustomerAccountTokenRequest<AuthTokenResponse>(body);

    await Auth.storeAuthToken(authToken);

    return authToken;
  },
  /**
   * Return the stored access token if available.
   * This is usually used to decide the default auth state.
   */
  getStoredAccessToken: () => {
    return SecureStore.getItem(ACCESS_TOKEN_STORAGE_KEY);
  },
  /**
   * Return the stored access token if available and not expired,
   * otherwise refresh token and return a new one.
   */
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
  /**
   * Due to the Token Exchange, we need to exchange the access token for another one
   * in order to make requests to the Shopify Customer Account API.
   * @see https://shopify.dev/docs/api/customer#step-use-access-token
   */
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

/**
 * State acts as a security measure to prevent cross-site request forgery (CSRF) attacks.
 * @see https://shopify.dev/docs/api/customer#generating-state
 */
function generateState() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

/**
 * Nonces help protect against unauthorized reuse of captured messages by
 * verifying that they are recent and have not been tampered with.
 * @see https://shopify.dev/docs/api/customer#generating-nonce
 */
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
