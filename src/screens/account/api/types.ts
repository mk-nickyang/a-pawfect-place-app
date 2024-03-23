import type { Maybe } from '@shopify/hydrogen-react/storefront-api-types';

/**
 * Customer Account API types are not available in `@shopify/hydrogen-react` yet,
 * manually create them for now
 */
export type Customer = {
  displayName: string;
  emailAddress: Maybe<{
    emailAddress: string;
  }>;
  id: string;
};
