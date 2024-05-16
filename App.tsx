import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
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

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthContextProvider } from '@/context/AuthContext';
import { ShopifyCheckoutContext } from '@/context/ShopifyCheckoutContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { Logger } from '@/modules/logger';
import { clientPersister } from '@/modules/storage';
import { AppNavigator } from '@/navigation/AppNavigator';

Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN, enabled: !__DEV__ });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => Logger.error(error),
  }),
});

persistQueryClient({
  queryClient,
  persister: clientPersister,
});

function App() {
  return (
    <ThemeContextProvider>
      <ErrorBoundary>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <AuthContextProvider>
                  <ShopifyCheckoutContext>
                    <AppNavigator />
                  </ShopifyCheckoutContext>
                </AuthContextProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </ThemeContextProvider>
  );
}

export default Sentry.wrap(App);
