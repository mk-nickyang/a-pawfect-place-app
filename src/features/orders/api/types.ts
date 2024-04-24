import type {
  MoneyV2,
  PageInfo,
} from '@shopify/hydrogen-react/storefront-api-types';

type OrderLineItemEdge = {
  node: { id: string; quantity: number; image?: { url: string } };
};

type OrderFulfillmentEdge = {
  node: {
    id: string;
    createdAt: string;
    latestShipmentStatus: 'CONFIRMED' | 'DELIVERED';
    trackingInformation?: {
      company: string;
      number: string;
      url: string;
    }[];
  };
};

export type OrderFulfillments = { edges: OrderFulfillmentEdge[] };

export type Order = {
  id: string;
  name: string;
  processedAt: string;
  lineItems: { edges: OrderLineItemEdge[] };
  totalPrice: MoneyV2;
  fulfillments: OrderFulfillments;
};

export type OrderEdge = { node: Order };

export type Orders = {
  edges: OrderEdge[];
  pageInfo: PageInfo;
};

export type OrderStatus = 'CONFIRMED' | 'SHIPPED';

export type OrderDetails = {
  id: string;
  name: string;
  createdAt: string;
  processedAt: string;
  fulfillments: OrderFulfillments;
};
