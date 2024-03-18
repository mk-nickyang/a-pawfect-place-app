import * as Sentry from '@sentry/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { ErrorBoundary } from '@/components/ErrorBoundary';
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
            <AppNavigator />
          </QueryClientProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default Sentry.wrap(App);
