import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { memo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme from '@/theme';

type Props = { note: string | undefined | null };

const CART_NOTE_BOTTOM_SHEET_SNAP_POINTS = ['25%', '50%'];

export const CartNote = memo(({ note }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <PressableOpacity
        hitSlop={theme.spacing.s}
        onPress={() => bottomSheetRef.current?.expand()}
        style={styles.container}
      >
        <Icon name="note-text-outline" size={20} />
        <Text>Add a Note</Text>
      </PressableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={CART_NOTE_BOTTOM_SHEET_SNAP_POINTS}
        keyboardBehavior="fillParent"
      >
        <BottomSheetTextInput />
      </BottomSheet>
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
