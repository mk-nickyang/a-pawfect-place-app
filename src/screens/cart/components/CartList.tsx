import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { CartLineItem } from './CartLineItem';
import { useCart } from '../api/useCart';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import theme from '@/theme';

type Props = { cartId: string; emptyView: JSX.Element };

const keyExtractor = (item: BaseCartLineEdge) => item.node.id;

const renderItem: ListRenderItem<BaseCartLineEdge> = ({ item }) => (
  <CartLineItem cartLine={item.node} />
);

export const CartList = memo(({ cartId, emptyView }: Props) => {
  const navigation = useNavigation();

  const { data: cart } = useCart(cartId);

  const listFooter = useMemo(
    () => (
      <Button
        label="CHECKOUT"
        onPress={() =>
          cart?.checkoutUrl &&
          navigation.navigate('Checkout', { checkoutUrl: cart.checkoutUrl })
        }
        style={styles.checkoutBtn}
      />
    ),
    [cart?.checkoutUrl, navigation],
  );

  if (!cart?.lines.edges.length) return emptyView;

  return (
    <FlashList
      data={cart.lines.edges}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={250}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={listFooter}
    />
  );
});

CartList.displayName = 'CartList';

const styles = StyleSheet.create({
  checkoutBtn: {
    margin: theme.spacing.m,
  },
});
