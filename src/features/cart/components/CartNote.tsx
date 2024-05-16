import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { memo, useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useUpdateCartNote } from '../api/useUpdateCartNote';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal, ModalRef } from '@/components/Modal';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useThemeMode } from '@/context/ThemeContext';
import { Haptics } from '@/modules/haptics';
import { spacing, useTheme } from '@/theme';

type Props = { note: string | undefined | null; cartId: string };

export const CartNote = memo(({ note, cartId }: Props) => {
  const noteString = (note || '').trim();

  const modalRef = useRef<ModalRef>(null);
  const noteRef = useRef(noteString);

  const { colors } = useTheme();
  const themeMode = useThemeMode();

  const { mutate, isPending } = useUpdateCartNote(cartId);

  const onCartNoteChange = useCallback(
    (newText: string) => (noteRef.current = newText),
    [],
  );

  const onCartNoteSave = () => {
    const newNote = noteRef.current.trim();
    mutate(newNote, {
      onSuccess: () => {
        Haptics.impact();
        modalRef.current?.close();
      },
    });
  };

  return (
    <>
      <PressableOpacity
        hitSlop={spacing.s}
        onPress={() => {
          modalRef.current?.present();
          noteRef.current = noteString;
        }}
        style={styles.container}
      >
        {noteString ? (
          <>
            <Text fontWeight="600">NOTE</Text>
            <Icon
              name="square-edit-outline"
              size={20}
              color={colors.contentPrimary}
            />
            <Text style={styles.noteText}>{noteString}</Text>
          </>
        ) : (
          <>
            <Icon
              name="note-text-outline"
              size={20}
              color={colors.contentPrimary}
            />
            <Text>Add a Note</Text>
          </>
        )}
      </PressableOpacity>

      <Modal modalRef={modalRef} size="large">
        <Text variant="h3" mb="m">
          Name of your pets and delivery instruction (optional)
        </Text>

        <Box borderWidth={1} borderColor="borderPrimary" p="m" mb="l">
          <BottomSheetTextInput
            autoFocus
            allowFontScaling={false}
            clearButtonMode="while-editing"
            defaultValue={noteString}
            onChangeText={onCartNoteChange}
            placeholder="e.g. Bella. Please leave by the front door."
            maxLength={255}
            returnKeyType="done"
            placeholderTextColor={colors.contentSecondary}
            keyboardAppearance={themeMode}
            style={[styles.input, { color: colors.contentPrimary }]}
          />
        </Box>

        <Button label="SAVE" loading={isPending} onPress={onCartNoteSave} />
      </Modal>
    </>
  );
});

CartNote.displayName = 'CartNote';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.m,
  },
  noteText: {
    flex: 1,
    marginLeft: spacing.l,
    textAlign: 'right',
  },
  input: {
    fontSize: 16,
    paddingTop: 0,
  },
});
