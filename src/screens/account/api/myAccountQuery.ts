import { queryOptions } from '@tanstack/react-query';

import type { Customer } from './types';

import { shopifyCustomerAccountQuery } from '@/api';

const getCustomerGQLQuery = () => `
{
  customer {
    id
    displayName
    firstName
    lastName
  }
}
`;

const fetchMyAccount = async () => {
  const res = await shopifyCustomerAccountQuery<{ customer: Customer }>(
    getCustomerGQLQuery(),
  );
  return res.data.customer;
};

export const myAccountQuery = queryOptions({
  queryFn: fetchMyAccount,
  queryKey: ['my-account'],
  staleTime: Infinity,
});
