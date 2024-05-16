import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  ProductFilter,
  SearchSortKeys,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useState } from 'react';

import { useSearchProducts } from '../api/useSearchProducts';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductListFilter } from '../components/ProductList/ProductListFilter';
import { ProductListSorter } from '../components/ProductList/ProductListSorter';
import {
  PRODUCT_LIST_SORTER_BY_ID,
  ProductListSortId,
} from '../utils/constants';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { Text } from '@/components/Text';
import { useEvent } from '@/hooks/useEvent';
import type { RootStackParamList } from '@/navigation/types';

const SEARCH_PRODUCTS_SORT_IDS: ProductListSortId[] = [
  ProductListSortId.RELEVANCE,
  ProductListSortId.PRICE_ASC,
  ProductListSortId.PRICE_DESC,
];

export const SearchProducts = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'SearchProducts'>) => {
  const { searchQuery } = route.params;

  const [selectedSortId, setSelectedSortId] = useState<ProductListSortId>(
    ProductListSortId.RELEVANCE,
  );
  const [productFilter, setProductFilter] = useState<ProductFilter>({});

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useSearchProducts({
    query: searchQuery,
    sortKey: PRODUCT_LIST_SORTER_BY_ID[selectedSortId]
      .sortKey as SearchSortKeys,
    reverse: PRODUCT_LIST_SORTER_BY_ID[selectedSortId].reverse,
    filters: productFilter,
  });

  const fetchNextSearchPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading height="100%" />;

  return (
    <Box flex={1} backgroundColor="screenBackground">
      <Box
        p="m"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        g="m"
      >
        <ProductListSorter
          value={selectedSortId}
          onChange={setSelectedSortId}
          availableSortIds={SEARCH_PRODUCTS_SORT_IDS}
        />
        <ProductListFilter value={productFilter} onChange={setProductFilter} />
      </Box>

      {products?.length ? (
        <ProductList
          data={products}
          hasNextPage={hasNextPage}
          onRefresh={refetch}
          onEndReached={fetchNextSearchPage}
        />
      ) : (
        <Box px="m">
          <Text variant="body1">No products found.</Text>
        </Box>
      )}
    </Box>
  );
};
