import { StyleSheet } from 'react-native';

import { useRemoveCartItem } from '../api/useRemoveCartItem';
import { getCurrentCartId } from '../utils';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';

type Props = { lineId: string };

export const LineItemRemoveButton = ({ lineId }: Props) => {
  const { mutate } = useRemoveCartItem();

  const onRemove = () => {
    const cartId = getCurrentCartId();
    if (!cartId) return;

    mutate({ lineId, cartId });
  };

  return (
    <PressableOpacity onPress={onRemove} hitSlop={16} style={styles.container}>
      <Icon name="close" size={20} />
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
});
