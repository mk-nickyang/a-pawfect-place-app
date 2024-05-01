import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useSearchProducts } from '../api/useSearchProducts';
import { ProductList } from '../components/ProductList/ProductList';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { useEvent } from '@/hooks/useEvent';
import type { RootStackParamList } from '@/navigation/types';

export const SearchProducts = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'SearchProducts'>) => {
  const { searchQuery } = route.params;

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useSearchProducts(searchQuery);

  const fetchNextSearchPage = useEvent(() => {
    if (hasNextPage && !isFetching && !isLoading) {
      fetchNextPage();
    }
  });

  if (isLoading) return <Loading height="100%" />;

  if (!products?.length) return null;

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <ProductList
        data={products}
        hasNextPage={hasNextPage}
        onRefresh={refetch}
        onEndReached={fetchNextSearchPage}
      />
    </Box>
  );
};
