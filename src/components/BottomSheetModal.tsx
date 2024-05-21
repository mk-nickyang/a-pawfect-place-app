import {
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheet,
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

import { useTheme, spacing } from '@/theme';

type Props = PropsWithChildren<{
  modalRef: RefObject<BottomSheetModalMethods>;
  size: 'small' | 'medium' | 'large';
}>;

const BOTTOM_SHEET_SNAP_POINTS = {
  small: ['40%'],
  medium: ['60'],
  large: ['75%'],
} as const;

export type BottomSheetModalRef = BottomSheet;

export const BottomSheetModal = ({ modalRef, size, children }: Props) => {
  const { spacing, colors } = useTheme();

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
    <BottomSheet
      ref={modalRef}
      snapPoints={BOTTOM_SHEET_SNAP_POINTS[size]}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      backgroundStyle={{ backgroundColor: colors.mainBackground }}
    >
      <BottomSheetView
        style={[
          styles.container,
          {
            paddingBottom: spacing.s + insets.bottom,
          },
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
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
        backgroundColor: colors.modalBackground,
      },
      containerAnimatedStyle,
    ],
    [style, colors.modalBackground, containerAnimatedStyle],
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
    paddingTop: spacing.l,
    paddingHorizontal: spacing.l,
  },
  closeBtn: {
    marginBottom: spacing.m,
    alignSelf: 'flex-end',
  },
});
