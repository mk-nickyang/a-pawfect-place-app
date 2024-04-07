import type {
  MoneyV2,
  PageInfo,
} from '@shopify/hydrogen-react/storefront-api-types';

type OrderLineItemEdge = {
  node: { id: string; quantity: number; image?: { url: string } };
};

type OrderFulfillmentEdge = {
  node: { id: string; createdAt: string; latestShipmentStatus: 'DELIVERED' };
};

export type Order = {
  id: string;
  name: string;
  processedAt: string;
  lineItems: { edges: OrderLineItemEdge[] };
  totalPrice: MoneyV2;
  fulfillments: { edges: OrderFulfillmentEdge[] };
};

export type OrderEdge = { node: Order };

export type Orders = {
  edges: OrderEdge[];
  pageInfo: PageInfo;
};

export type OrderStatus = 'CONFIRMED' | 'DELIVERED';

export type OrderDetails = {
  id: string;
  name: string;
};
