import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { useQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

const getProductRecommendationsGQLQuery = (productId: string) => `
  {
    productRecommendations(productId: "${productId}") {
      id
      title
      featuredImage {
        url
        id
      }
      availableForSale
      compareAtPriceRange {
        minVariantPrice {
          amount
        }
        maxVariantPrice {
          amount
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
        minVariantPrice {
          amount
        }
      }
    }
  }
`;

const fetchProductRecommendations = async (productId: string) => {
  const res = await shopifyStorefrontQuery<{
    productRecommendations: Product[];
  }>(getProductRecommendationsGQLQuery(productId));
  return res.data?.productRecommendations;
};

export const useProductRecommendations = (productId: string) => {
  return useQuery({
    queryFn: () => fetchProductRecommendations(productId),
    queryKey: ['productRecommendations', { productId }],
  });
};
