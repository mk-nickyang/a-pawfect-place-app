import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { PropsWithChildren, RefObject, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Box } from './Box';
import { Icon } from './Icon';
import { PressableOpacity } from './PressableOpacity';

import theme, { useTheme } from '@/theme';

type Props = PropsWithChildren<{
  modalRef: RefObject<BottomSheetModalMethods>;
}>;

const BOTTOM_SHEET_SNAP_POINTS = ['75%'];

export const Modal = ({ modalRef, children }: Props) => {
  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} onClose={closeModal} />
    ),
    [closeModal],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={BOTTOM_SHEET_SNAP_POINTS}
      handleComponent={null}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView style={styles.container}>
        <Box p="l">
          <PressableOpacity
            hitSlop={10}
            onPress={closeModal}
            style={styles.closeBtn}
          >
            <Icon name="close" size={24} />
          </PressableOpacity>

          {children}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const BottomSheetBackdrop = ({
  animatedIndex,
  style,
  onClose,
}: BottomSheetBackdropProps & { onClose: () => void }) => {
  const { colors } = useTheme();

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: colors.contentPrimary,
      },
      containerAnimatedStyle,
    ],
    [style, colors.contentPrimary, containerAnimatedStyle],
  );

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    marginBottom: theme.spacing.m,
    alignSelf: 'flex-end',
  },
});
