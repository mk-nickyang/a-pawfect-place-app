import { SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL, WEBSITE_URL } from '@/config';

const LOGIN_REDIRECT_URL = WEBSITE_URL;

/** @see https://shopify.dev/docs/api/customer#step-authorization */
export const getLoginUrl = () => {
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
    LOGIN_REDIRECT_URL,
  );

  authorizationRequestUrl.searchParams.append('state', generateState());

  authorizationRequestUrl.searchParams.append('nonce', generateNonce(16));

  // Public client
  const verifier = generateCodeVerifier();
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

function generateRandomCode() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
}

function base64UrlEncode(str: string) {
  const base64 = btoa(str);
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeVerifier() {
  const rando = generateRandomCode();
  return base64UrlEncode(rando);
}
