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
    orders(first: 10) {
      edges {
        node {
          id
          name
          processedAt
          lineItems(first: 10) {
            edges {
              node {
                id
                image {
                  url
                }
              }
            }
          }
          totalPrice {
            amount
          }
          fulfillments(first: 10) {
            edges {
              node {
                id
                createdAt
                updatedAt
                status
                trackingInformation {
                    company
                    number
                    url
                }
                estimatedDeliveryAt
                latestShipmentStatus
              }
            }
          }
        }
      }
    }
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
});
