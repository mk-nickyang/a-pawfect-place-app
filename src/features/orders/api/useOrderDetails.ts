import { useQuery } from '@tanstack/react-query';

import type { OrderDetails } from './types';

import { shopifyCustomerAccountQuery } from '@/api';

const getOrderDetailsGQLQuery = (orderId: string) => `
{
  order(id: "${orderId}") {
    id
    name
    note
    createdAt
    processedAt
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
    lineItems(first: 10) {
      edges {
        node {
          id
          name
          quantity
          productId
          totalPrice {
            amount
          }
          image {
            url
          }
          variantTitle
        }
      }
    }
    totalShipping {
      amount
      currencyCode
    }
    totalPrice {
      amount
      currencyCode
    }
    shippingAddress {
      name
      formatted
    }
    billingAddress {
      name
      formatted
    }
    transactions {
      paymentIcon {
        url
      }
      paymentDetails {
        ... on CardPaymentDetails {
          cardBrand
          last4
        }
      }
      typeDetails {
        name
      }
    }
    shippingLine {
      title
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
`;

const fetchMyAccountOrderDetails = async (orderId: string) => {
  const res = await shopifyCustomerAccountQuery<{
    order: OrderDetails;
  }>(getOrderDetailsGQLQuery(orderId));
  return res.data.order;
};

export const useOrderDetails = (orderId: string) => {
  return useQuery({
    queryFn: () => fetchMyAccountOrderDetails(orderId),
    queryKey: ['my-account', 'orders', { orderId }],
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};
