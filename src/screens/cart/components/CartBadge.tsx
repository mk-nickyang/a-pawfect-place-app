import { memo } from 'react';

import { useCartItemsLength } from '../api/useCart';
import { useCartId } from '../useCartId';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

type Props = { cartId: string };

const CART_BADGE_SIZE = 16;

const _CartBadge = ({ cartId }: Props) => {
  const { data: cartItemsLength } = useCartItemsLength(cartId);

  if (!cartItemsLength) return null;

  return (
    <Box
      backgroundColor="saleBadgeBackground"
      position="absolute"
      top={-2}
      right={-10}
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
        fontSize={12}
        lineHeight={14}
      >
        {cartItemsLength}
      </Text>
    </Box>
  );
};

export const CartBadge = memo(() => {
  const { cartId } = useCartId();

  if (!cartId) return null;

  return <_CartBadge cartId={cartId} />;
});

CartBadge.displayName = 'CartBadge';
