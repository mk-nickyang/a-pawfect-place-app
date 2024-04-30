import { memo } from 'react';

import { ProductsSearchSuggestions } from './ProductsSearchSuggestions';
import { RecentlyViewedProducts } from './RecentlyViewedProducts';
import {
  useIsSearchBarFocused,
  useIsSearchQueryEmpty,
} from '../../store/productsSearch';

import { Box } from '@/components/Box';

const ProductsSearchOverlayView = () => {
  const isSearchQueryEmpty = useIsSearchQueryEmpty();

  return (
    <Box
      backgroundColor="mainBackground"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      {isSearchQueryEmpty ? (
        <RecentlyViewedProducts />
      ) : (
        <ProductsSearchSuggestions />
      )}
    </Box>
  );
};

export const ProductsSearchOverlay = memo(() => {
  const isSearchBarFocused = useIsSearchBarFocused();

  if (!isSearchBarFocused) return null;

  return <ProductsSearchOverlayView />;
});

ProductsSearchOverlay.displayName = 'ProductsSearchOverlay';
