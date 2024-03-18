import type {
  CartLine,
  ComponentizableCartLine,
} from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';

import { LineItemQuantity } from './LineItemQuantity';
import { LineItemRemoveButton } from './LineItemRemoveButton';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

type Props = { cartLine: CartLine | ComponentizableCartLine };

const CART_ITEM_IMAGE_SIZE = 120;

export const CartLineItem = ({ cartLine }: Props) => {
  const { merchandise, quantity, cost } = cartLine;
  const { image, product, selectedOptions } = merchandise;

  return (
    <Box flexDirection="row" alignItems="flex-start" g="m" p="m">
      <Image
        source={image?.url}
        style={{ width: CART_ITEM_IMAGE_SIZE, height: CART_ITEM_IMAGE_SIZE }}
      />

      <Box flex={1} alignItems="flex-start" pr="l">
        <Text mb="s" fontWeight="600">
          {product.title}
        </Text>

        {(selectedOptions || []).map((variantOption) => {
          if (variantOption.name.toLowerCase() === 'title') return null;
          return (
            <Text key={variantOption.name}>
              {variantOption.name}: {variantOption.value}
            </Text>
          );
        })}

        <Box my="s" flexDirection="row" g="s">
          <Text fontWeight="600">${cost.amountPerQuantity.amount}</Text>
          {cost.compareAtAmountPerQuantity?.amount ? (
            <Text textDecorationLine="line-through">
              {cost.compareAtAmountPerQuantity.amount}
            </Text>
          ) : null}
        </Box>

        <LineItemQuantity quantity={quantity} />

        <Text fontWeight="600">
          <Text color="contentSecondary">Subtotal:</Text> $
          {cost.totalAmount.amount}
        </Text>
      </Box>

      <LineItemRemoveButton lineId={cartLine.id} />
    </Box>
  );
};
