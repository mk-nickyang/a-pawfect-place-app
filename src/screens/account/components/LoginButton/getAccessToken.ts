import axios from 'axios';

import { AUTH_CODE_VERIFIER_STORAGE_KEY } from '../../utils';

import {
  SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL,
  SHOPIFY_WEBSITE_URL,
} from '@/config';
import { PersistedStorage } from '@/modules/storage';

type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
};

export const getAccessToken = async (code: string) => {
  const codeVerifier = PersistedStorage.getItem(AUTH_CODE_VERIFIER_STORAGE_KEY);

  const response = await axios.post<AccessTokenResponse>(
    SHOPIFY_CUSTOMER_ACCOUNT_AUTH_TOKEN_URL,
    {
      grant_type: 'authorization_code',
      client_id: process.env.EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID,
      redirect_uri: SHOPIFY_WEBSITE_URL,
      code,
      code_verifier: codeVerifier,
    },
  );

  return response.data;
};
