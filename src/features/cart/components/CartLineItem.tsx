import { useNavigation } from '@react-navigation/native';
import type {
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { LineItemQuantity } from './LineItemQuantity';
import { LineItemRemoveButton } from './LineItemRemoveButton';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { formatPrice } from '@/utils/currency';

type Props = { cartLine: CartLine | ComponentizableCartLine; cartId: string };

const CART_ITEM_IMAGE_SIZE = 120;

export const CartLineItem = ({ cartLine, cartId }: Props) => {
  const { merchandise, quantity, cost } = cartLine;
  const { image, product, selectedOptions, quantityAvailable } = merchandise;

  const navigation = useNavigation();

  const navigateToProduct = () => {
    navigation.navigate('Product', {
      productId: product.id,
      productTitle: product.title,
    });
  };

  return (
    <Box flexDirection="row" alignItems="flex-start" g="m" p="m">
      <PressableOpacity onPress={navigateToProduct}>
        <Image source={image?.url} style={styles.image} />
      </PressableOpacity>

      <Box flex={1} alignItems="flex-start" pr="l">
        <PressableOpacity onPress={navigateToProduct}>
          <Text mb="xs" fontWeight="600">
            {product.title}
          </Text>
        </PressableOpacity>

        {(selectedOptions || []).map((variantOption) => {
          if (variantOption.name.toLowerCase() === 'title') return null;
          return (
            <Text key={variantOption.name}>
              {variantOption.name}: {variantOption.value}
            </Text>
          );
        })}

        <Box mt="xs" mb="s" flexDirection="row" g="s">
          <Text fontWeight="600">{formatPrice(cost.amountPerQuantity)}</Text>
          {cost.compareAtAmountPerQuantity?.amount ? (
            <Text textDecorationLine="line-through">
              {cost.compareAtAmountPerQuantity.amount}
            </Text>
          ) : null}
        </Box>

        <LineItemQuantity
          quantity={quantity}
          quantityAvailable={quantityAvailable ?? undefined}
          lineId={cartLine.id}
          cartId={cartId}
        />

        <Text fontWeight="600">
          <Text color="contentSecondary">Subtotal:</Text>{' '}
          {formatPrice(cost.totalAmount)}
        </Text>
      </Box>

      <LineItemRemoveButton lineId={cartLine.id} cartId={cartId} />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: CART_ITEM_IMAGE_SIZE,
    height: CART_ITEM_IMAGE_SIZE,
    borderRadius: 6,
  },
});
