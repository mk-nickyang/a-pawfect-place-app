import { infiniteQueryOptions } from '@tanstack/react-query';

import type { Orders } from './types';

import { shopifyCustomerAccountQuery } from '@/api';

const getCustomerOrdersGQLQuery = (endCursor?: string) => `
{
  customer {
    orders(first: 5, ${endCursor ? `after: "${endCursor}", ` : ''}sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          id
          name
          processedAt
          lineItems(first: 10) {
            edges {
              node {
                id
                quantity
                image {
                  url
                }
              }
            }
          }
          totalPrice {
            amount
          }
          fulfillments(first: 1) {
            edges {
              node {
                id
                createdAt
                latestShipmentStatus
                trackingInformation {
                  company
                  number
                  url
                }      
              }
            }
          }
          refunds {
            id
            createdAt
            totalRefunded {
              amount
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

const fetchMyAccountOrders = async ({ pageParam }: { pageParam?: string }) => {
  const res = await shopifyCustomerAccountQuery<{
    customer: { orders: Orders };
  }>(getCustomerOrdersGQLQuery(pageParam));
  return res.data.customer.orders;
};

export const ordersQuery = infiniteQueryOptions({
  queryFn: fetchMyAccountOrders,
  queryKey: ['my-account', 'orders'],
  initialPageParam: '',
  getNextPageParam: (lastPage) =>
    lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
  staleTime: 1000 * 60 * 5, // 5 mins
});
