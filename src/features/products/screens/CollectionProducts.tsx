import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProductFilter } from '@shopify/hydrogen-react/storefront-api-types';
import { useState } from 'react';

import { useCollectionProducts } from '../api/useCollectionProducts';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductListFilter } from '../components/ProductList/ProductListFilter';
import { ProductListSorter } from '../components/ProductList/ProductListSorter';
import {
  ProductListSortId,
  PRODUCT_LIST_SORTER_BY_ID,
} from '../utils/constants';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { Text } from '@/components/Text';
import { useEvent } from '@/hooks/useEvent';
import type { RootStackParamList } from '@/navigation/types';

const COLLECTION_PRODUCTS_SORT_IDS: ProductListSortId[] = [
  ProductListSortId.BEST_SELLING,
  ProductListSortId.CREATED,
  ProductListSortId.TITLE_ASC,
  ProductListSortId.TITLE_DESC,
  ProductListSortId.PRICE_ASC,
  ProductListSortId.PRICE_DESC,
];

export const CollectionProducts = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'CollectionProducts'>) => {
  const { collectionHandle } = route.params;

  const [selectedSortId, setSelectedSortId] = useState<ProductListSortId>(() =>
    collectionHandle === 'best-seller'
      ? ProductListSortId.BEST_SELLING
      : ProductListSortId.CREATED,
  );
  const [productFilter, setProductFilter] = useState<ProductFilter>({});

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useCollectionProducts({
    handle: collectionHandle,
    sortKey: PRODUCT_LIST_SORTER_BY_ID[selectedSortId].sortKey,
    reverse: PRODUCT_LIST_SORTER_BY_ID[selectedSortId].reverse,
    filters: productFilter,
  });

  const fetchNextCollectionProductsPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading height="100%" />;

  return (
    <Box flex={1} backgroundColor="mainBackground">
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
          availableSortIds={COLLECTION_PRODUCTS_SORT_IDS}
        />
        <ProductListFilter value={productFilter} onChange={setProductFilter} />
      </Box>

      {products?.length ? (
        <ProductList
          data={products}
          hasNextPage={hasNextPage}
          onRefresh={refetch}
          onEndReached={fetchNextCollectionProductsPage}
        />
      ) : (
        <Box px="m">
          <Text variant="body1">No products found.</Text>
        </Box>
      )}
    </Box>
  );
};
