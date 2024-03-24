import { infiniteQueryOptions } from '@tanstack/react-query';

import type { CustomerOrders } from './types';

import { shopifyCustomerAccountQuery } from '@/api';

const getCustomerOrdersGQLQuery = (endCursor?: string) => `
{
  customer {
    orders(first: 5${endCursor ? `, after: "${endCursor}", ` : ''}) {
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
    customer: { orders: CustomerOrders };
  }>(getCustomerOrdersGQLQuery(pageParam));
  return res.data.customer.orders;
};

export const ordersQuery = infiniteQueryOptions({
  queryFn: fetchMyAccountOrders,
  queryKey: ['my-account', 'orders'],
  initialPageParam: '',
  getNextPageParam: (lastPage) =>
    lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
});
