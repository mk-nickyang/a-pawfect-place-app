import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

import type { RootStackParamList } from '@/navigation/types';

export const Checkout = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Checkout'>) => {
  const { checkoutUrl } = route.params;

  return <WebView source={{ uri: checkoutUrl }} />;
};
