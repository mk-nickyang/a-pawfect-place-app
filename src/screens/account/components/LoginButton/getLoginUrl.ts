import * as Crypto from 'expo-crypto';
import { btoa } from 'react-native-quick-base64';

import { AUTH_CODE_VERIFIER_STORAGE_KEY } from '../../utils';

import {
  SHOPIFY_CUSTOMER_ACCOUNT_AUTH_URL,
  SHOPIFY_WEBSITE_URL,
} from '@/config';
import { PersistedStorage } from '@/modules/storage';

/** @see https://shopify.dev/docs/api/customer#step-authorization */
export const getLoginUrl = async () => {
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
    SHOPIFY_WEBSITE_URL,
  );

  authorizationRequestUrl.searchParams.append('state', generateState());

  authorizationRequestUrl.searchParams.append('nonce', generateNonce(16));

  // Public client
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  PersistedStorage.setItem(AUTH_CODE_VERIFIER_STORAGE_KEY, verifier);

  authorizationRequestUrl.searchParams.append('code_challenge', challenge);
  authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256');

  return authorizationRequestUrl.toString();
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
  Crypto.getRandomValues(array);
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

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
    { encoding: Crypto.CryptoEncoding.BASE64 },
  );
  return digest;
}
