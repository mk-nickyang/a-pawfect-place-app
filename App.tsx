import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { AppNavigator } from '@/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
