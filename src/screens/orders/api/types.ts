import type {
  MoneyV2,
  PageInfo,
} from '@shopify/hydrogen-react/storefront-api-types';

type CustomerOrderLineItemEdge = {
  node: { id: string; quantity: number; image?: { url: string } };
};

type CustomerOrderFulfillmentEdge = {
  node: { id: string; createdAt: string; latestShipmentStatus: 'DELIVERED' };
};

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  lineItems: { edges: CustomerOrderLineItemEdge[] };
  totalPrice: MoneyV2;
  fulfillments: { edges: CustomerOrderFulfillmentEdge[] };
};

export type CustomerOrderEdge = { node: CustomerOrder };

export type CustomerOrders = {
  edges: CustomerOrderEdge[];
  pageInfo: PageInfo;
};

export type OrderStatus = 'CONFIRMED' | 'DELIVERED';
