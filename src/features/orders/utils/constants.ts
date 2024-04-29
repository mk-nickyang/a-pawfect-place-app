import type { OrderStatus } from '../api/types';

export const ORDER_STATUS_MESSAGE: Record<OrderStatus, string> = {
  CONFIRMED: `We're getting your order ready to be shipped. We will notify you when it has been sent.`,
  SHIPPED: `Your order is shipped. Track your shipment below to see the delivery status.`,
  REFUNDED: `Your order has been refunded. It may take up to 10 days for this refund to appear in your account.`,
};
