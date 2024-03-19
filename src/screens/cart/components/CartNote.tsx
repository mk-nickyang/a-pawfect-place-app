import { memo, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme from '@/theme';

type Props = { note: string | undefined | null };

export const CartNote = memo(({ note }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PressableOpacity
        hitSlop={theme.spacing.s}
        onPress={() => setIsModalOpen(true)}
        style={styles.container}
      >
        <Icon name="note-text-outline" size={20} />
        <Text>Add a Note</Text>
      </PressableOpacity>

      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Text>Name of your pets and delivery instruction (optional)</Text>
      </Modal>
    </>
  );
});

CartNote.displayName = 'CartNote';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.l,
  },
});
