import type { OrderFulfillments, OrderStatus } from './types';

export const getOrderStatus = (
  orderFulfillments: OrderFulfillments,
): OrderStatus => {
  const firstFulfillment = orderFulfillments.edges[0]?.node;
  if (!firstFulfillment) return 'CONFIRMED';

  return firstFulfillment.trackingInformation?.[0]?.url
    ? 'SHIPPED'
    : 'CONFIRMED';
};
