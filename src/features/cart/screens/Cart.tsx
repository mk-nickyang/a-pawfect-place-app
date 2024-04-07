import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';

import { CartList } from '../components/CartList';
import { useCartId } from '../hooks/useCartId';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';

export const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  const { cartId } = useCartId();

  const emptyView = useMemo(
    () => (
      <ScrollView>
        <Box padding="m">
          <Text mb="m">Your cart is currently empty.</Text>
          <Button
            label="CONTINUE SHOPPING"
            onPress={() => navigation.navigate('ProductsTab')}
          />
        </Box>
      </ScrollView>
    ),
    [navigation],
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      {cartId ? <CartList cartId={cartId} emptyView={emptyView} /> : emptyView}
    </Box>
  );
};
