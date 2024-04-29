import type {
  MailingAddress,
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

export type OrderRefund = {
  id: string;
  createdAt: string;
  totalRefunded: MoneyV2;
};

export type Order = {
  id: string;
  name: string;
  processedAt: string;
  lineItems: { edges: OrderLineItemEdge[] };
  totalPrice: MoneyV2;
  fulfillments: OrderFulfillments;
  refunds?: OrderRefund[];
};

export type OrderEdge = { node: Order };

export type Orders = {
  edges: OrderEdge[];
  pageInfo: PageInfo;
};

export type OrderStatus = 'CONFIRMED' | 'SHIPPED' | 'REFUNDED';

export type OrderDetailsLineItemEdge = {
  node: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    image?: { url: string };
    totalPrice?: MoneyV2;
  };
};

export type OrderTransaction = {
  paymentIcon?: {
    url: string;
  };
  paymentDetails?: {
    cardBrand: string;
    last4: string;
  };
  typeDetails?: {
    name: 'shopify_payments' | 'paypal';
  };
};

export type OrderDetails = {
  id: string;
  name: string;
  note?: string;
  createdAt: string;
  processedAt: string;
  fulfillments: OrderFulfillments;
  lineItems?: { edges: OrderDetailsLineItemEdge[] };
  totalShipping?: MoneyV2;
  totalPrice?: MoneyV2;
  shippingAddress?: MailingAddress;
  billingAddress?: MailingAddress;
  transactions?: OrderTransaction[];
  shippingLine?: { title: string };
  refunds?: OrderRefund[];
};
