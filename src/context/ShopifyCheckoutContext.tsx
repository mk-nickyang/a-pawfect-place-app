import {
  ColorScheme,
  ShopifyCheckoutSheetProvider,
} from '@shopify/checkout-sheet-kit';
import type { PropsWithChildren } from 'react';

import { useThemeMode } from './ThemeContext';

export const ShopifyCheckoutContext = ({ children }: PropsWithChildren) => {
  const themeMode = useThemeMode();

  return (
    <ShopifyCheckoutSheetProvider
      configuration={{
        preloading: true,
        colorScheme:
          themeMode === 'dark' ? ColorScheme.dark : ColorScheme.light,
      }}
    >
      {children}
    </ShopifyCheckoutSheetProvider>
  );
};
