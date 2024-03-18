import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { CartList } from './components/CartList/CartList';
import { useCartId } from './useCartId';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';

export const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  const cartId = useCartId();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      {cartId ? (
        <CartList cartId={cartId} />
      ) : (
        <ScrollView>
          <Box padding="m">
            <Text mb="m">Your cart is currently empty.</Text>
            <Button
              label="CONTINUE SHOPPING"
              onPress={() => navigation.navigate('Shop')}
            />
          </Box>
        </ScrollView>
      )}
    </Box>
  );
};
