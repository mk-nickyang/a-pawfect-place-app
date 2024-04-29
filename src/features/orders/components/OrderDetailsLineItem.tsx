import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import type { OrderDetailsLineItemEdge } from '../api/types';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = { lineItem: OrderDetailsLineItemEdge['node'] };

const LINE_ITEM_IMAGE_SIZE = 72;
const CART_BADGE_SIZE = 16;

export const OrderDetailsLineItem = ({ lineItem }: Props) => {
  const navigation = useNavigation();

  const navigateToProduct = () => {
    navigation.navigate('ProductsTab', {
      screen: 'Product',
      params: { productId: lineItem.productId },
      initial: false,
    });
  };

  return (
    <Box flexDirection="row" alignItems="center" g="l">
      <PressableOpacity onPress={navigateToProduct}>
        <Image
          source={lineItem.image?.url}
          style={{
            width: LINE_ITEM_IMAGE_SIZE,
            height: LINE_ITEM_IMAGE_SIZE,
          }}
        />

        <Box
          backgroundColor="badgeBackground"
          position="absolute"
          top={-6}
          right={-6}
          width={CART_BADGE_SIZE}
          height={CART_BADGE_SIZE}
          px="xs"
          borderRadius={CART_BADGE_SIZE}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            allowFontScaling={false}
            fontWeight="600"
            color="contentInverse"
            fontSize={11}
            lineHeight={12}
          >
            {lineItem.quantity}
          </Text>
        </Box>
      </PressableOpacity>

      <Box flex={1}>
        <Text fontWeight="600">{lineItem.name}</Text>
      </Box>

      <Text>${lineItem.totalPrice?.amount}</Text>
    </Box>
  );
};
