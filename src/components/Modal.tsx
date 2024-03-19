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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme, { useTheme } from '@/theme';

type Props = PropsWithChildren<{
  modalRef: RefObject<BottomSheetModalMethods>;
  size: 'small' | 'large';
}>;

const BOTTOM_SHEET_SNAP_POINTS = {
  small: ['40%'],
  large: ['75%'],
} as const;

export type ModalRef = BottomSheetModal;

export const Modal = ({ modalRef, size, children }: Props) => {
  const { spacing } = useTheme();

  const insets = useSafeAreaInsets();

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
      snapPoints={BOTTOM_SHEET_SNAP_POINTS[size]}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView
        style={[styles.container, { paddingBottom: spacing.s + insets.bottom }]}
      >
        {children}
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
      [0, 0.3],
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
    paddingTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.l,
  },
  closeBtn: {
    marginBottom: theme.spacing.m,
    alignSelf: 'flex-end',
  },
});
