import type { Customer } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { MY_ACCOUNT_QUERY_KEY } from './utils';

import { shopifyCustomerAccountQuery } from '@/api';
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';

const getCustomerGQLQuery = () => `
  {
    customer {
      displayName
      firstName
      lastName
      id
    }
  }
`;

const fetchMyAccount = async () => {
  const res = await shopifyCustomerAccountQuery<{ customer: Customer }>(
    getCustomerGQLQuery(),
  );
  return res.data.customer;
};

export const useMyAccount = () => {
  const { authenticationStatus } = useAuth();

  return useQuery({
    queryFn: fetchMyAccount,
    queryKey: MY_ACCOUNT_QUERY_KEY,
    enabled: authenticationStatus === AuthenticationStatus.AUTHENTICATED,
    staleTime: Infinity,
  });
};
