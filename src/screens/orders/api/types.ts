import type {
  CheckoutLineItemConnection,
  MoneyV2,
  PageInfo,
} from '@shopify/hydrogen-react/storefront-api-types';

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  lineItems: CheckoutLineItemConnection;
  totalPrice: MoneyV2;
};

export type CustomerOrderEdge = { node: CustomerOrder };

export type CustomerOrders = {
  edges: CustomerOrderEdge[];
  pageInfo: PageInfo;
};
