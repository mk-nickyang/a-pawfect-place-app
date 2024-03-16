import * as Sentry from '@sentry/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppNavigator } from '@/navigation/AppNavigator';
import theme from '@/theme';

Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN });

const queryClient = new QueryClient();

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
