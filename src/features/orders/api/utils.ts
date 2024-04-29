import type { MoneyV2 } from '@shopify/hydrogen-react/storefront-api-types';

import type { OrderFulfillments, OrderStatus, OrderRefund } from './types';

export const getOrderStatus = (order: {
  processedAt: string;
  fulfillments?: OrderFulfillments;
  refunds?: OrderRefund[];
  totalPrice?: MoneyV2;
}): { status: OrderStatus; updatedAt: string } => {
  const refund = order?.refunds?.[0];
  if (
    refund?.totalRefunded.amount &&
    order.totalPrice?.amount &&
    Number(order.totalPrice.amount) === 0
  ) {
    return { status: 'REFUNDED', updatedAt: refund.createdAt };
  }

  const firstFulfillment = order.fulfillments?.edges[0]?.node;
  if (!firstFulfillment)
    return { status: 'CONFIRMED', updatedAt: order.processedAt };

  return firstFulfillment.trackingInformation?.[0]?.url
    ? { status: 'SHIPPED', updatedAt: firstFulfillment.createdAt }
    : { status: 'CONFIRMED', updatedAt: order.processedAt };
};
