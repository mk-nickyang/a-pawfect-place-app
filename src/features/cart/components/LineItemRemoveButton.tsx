import { StyleSheet } from 'react-native';

import { useRemoveCartItem } from '../api/useRemoveCartItem';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Haptics } from '@/modules/haptics';

type Props = { lineId: string; cartId: string };

export const LineItemRemoveButton = ({ lineId, cartId }: Props) => {
  const { mutate } = useRemoveCartItem(cartId);

  const onRemove = () => {
    Haptics.impact();
    mutate(lineId);
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
