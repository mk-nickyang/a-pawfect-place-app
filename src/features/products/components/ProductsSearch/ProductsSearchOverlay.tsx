import { memo } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRODUCTS_SEARCH_BAR_HEIGHT } from './ProductsSearchBar';
import { ProductsSearchSuggestions } from './ProductsSearchSuggestions';
import { RecentlyViewedProducts } from './RecentlyViewedProducts';
import { TrendingSearches } from './TrendingSearches';
import {
  useIsProductsSearchShowing,
  useIsSearchQueryEmpty,
} from '../../store/productsSearch';

import { Box } from '@/components/Box';
import { useTheme } from '@/theme';

const ProductsSearchOverlayView = () => {
  const { spacing } = useTheme();

  const insets = useSafeAreaInsets();

  const isSearchQueryEmpty = useIsSearchQueryEmpty();

  return (
    <Box
      backgroundColor="mainBackground"
      position="absolute"
      top={(insets.top || spacing.s) + PRODUCTS_SEARCH_BAR_HEIGHT}
      left={0}
      right={0}
      bottom={0}
      px="m"
      pt="s"
      pb="xl"
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {isSearchQueryEmpty ? (
          <>
            <RecentlyViewedProducts />
            <TrendingSearches />
          </>
        ) : (
          <ProductsSearchSuggestions />
        )}
      </ScrollView>
    </Box>
  );
};

export const ProductsSearchOverlay = memo(() => {
  const isProductsSearchShowing = useIsProductsSearchShowing();

  if (!isProductsSearchShowing) return null;

  return <ProductsSearchOverlayView />;
});

ProductsSearchOverlay.displayName = 'ProductsSearchOverlay';
