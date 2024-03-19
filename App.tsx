import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { ShopifyCheckoutSheetProvider } from '@shopify/checkout-sheet-kit';
import { ThemeProvider } from '@shopify/restyle';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { logQueryError } from '@/api';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { shopifyCheckoutConfig } from '@/config';
import { clientPersister } from '@/modules/storage';
import { AppNavigator } from '@/navigation/AppNavigator';
import theme from '@/theme';

Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN, enabled: !__DEV__ });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  queryCache: new QueryCache({
    onError: (error) => logQueryError(error),
  }),
});

persistQueryClient({
  // @ts-expect-error Ignore queryClient type mismatch
  queryClient,
  persister: clientPersister,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <ShopifyCheckoutSheetProvider
                  configuration={shopifyCheckoutConfig}
                >
                  <AppNavigator />
                </ShopifyCheckoutSheetProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default Sentry.wrap(App);
