import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { memo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme from '@/theme';

type Props = { note: string | undefined | null };

const CART_NOTE_BOTTOM_SHEET_SNAP_POINTS = ['100%'];

export const CartNote = memo(({ note }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <PressableOpacity
        hitSlop={theme.spacing.s}
        onPress={() => bottomSheetModalRef.current?.present()}
        style={styles.container}
      >
        <Icon name="note-text-outline" size={20} />
        <Text>Add a Note</Text>
      </PressableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={CART_NOTE_BOTTOM_SHEET_SNAP_POINTS}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <Text>Name of your pets and delivery instruction (optional)</Text>
        </BottomSheetView>
      </BottomSheetModal>
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
  bottomSheetContainer: {
    flex: 1,
  },
});
