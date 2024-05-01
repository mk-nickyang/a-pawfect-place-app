import type {
  PredictiveSearchResult,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { shopifyStorefrontQuery } from '@/api';

type SuggestedProduct = Pick<Product, 'id' | 'title'>;

const getSearchSuggestionsGQLQuery = (query: string) => `
{
  predictiveSearch(query: "${query}", searchableFields: [TITLE, VARIANTS_TITLE, TAG, PRODUCT_TYPE], types: [PRODUCT], unavailableProducts: LAST) {
    products {
      id
      title
    }
  }
}
`;

const fetchSearchSuggestions = async (query: string) => {
  const res = await shopifyStorefrontQuery<{
    predictiveSearch: PredictiveSearchResult;
  }>(getSearchSuggestionsGQLQuery(query));
  return res.data.predictiveSearch.products as SuggestedProduct[];
};

export const useSearchSuggestions = (searchQuery: string) => {
  return useQuery({
    queryFn: () => fetchSearchSuggestions(searchQuery),
    queryKey: ['predictiveSearch', { query: searchQuery }, 'products'],
    enabled: searchQuery.length > 0,
    placeholderData: keepPreviousData,
  });
};
