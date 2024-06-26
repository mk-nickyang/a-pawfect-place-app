import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
import { spacing, useTheme } from '@/theme';

const ProductsSearchOverlayView = () => {
  const { spacing } = useTheme();

  const insets = useSafeAreaInsets();

  const isSearchQueryEmpty = useIsSearchQueryEmpty();

  return (
    <Box
      backgroundColor="screenBackground"
      position="absolute"
      top={(insets.top || spacing.s) + PRODUCTS_SEARCH_BAR_HEIGHT}
      left={0}
      right={0}
      bottom={0}
      px="m"
      pt="s"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
      >
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

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.l,
  },
});
