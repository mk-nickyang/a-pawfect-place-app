import type { Shop } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const getShopGQLQuery = () => `
{
  shop {
    privacyPolicy {
      body
    }
    termsOfService {
      body
    }
  }
}
`;

const fetchShopInfo = async () => {
  const res = await shopifyStorefrontQuery<{ shop: Shop }>(getShopGQLQuery());
  return res.data.shop;
};

export const useShopInfo = () => {
  return useQuery({
    queryFn: () => fetchShopInfo(),
    queryKey: ['shop'],
  });
};
