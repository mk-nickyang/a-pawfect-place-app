import { useQuery } from '@tanstack/react-query';

import type { OrderDetails } from './types';

import { shopifyCustomerAccountQuery } from '@/api';

const getOrderDetailsGQLQuery = (orderId: string) => `
{
  order(id: "${orderId}") {
    id
    name
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
