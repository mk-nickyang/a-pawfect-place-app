import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from './Box';
import { Icon } from './Icon';
import { ImagesCarousel } from './ImagesCarousel';
import { PressableOpacity } from './PressableOpacity';

import { spacing, useTheme } from '@/theme';

type Props = {
  openImageIndex?: number;
  onClose: () => void;
  imageUrls: string[];
};

export const ImagesModal = ({ openImageIndex, onClose, imageUrls }: Props) => {
  // Keep array reference stable
  const [stableImageUrls] = useState(imageUrls);

  useEffect(
    function prefetchImagesOnMount() {
      Image.prefetch(stableImageUrls);
    },
    [stableImageUrls],
  );

  return (
    <Modal
      visible={openImageIndex !== undefined}
      onRequestClose={onClose}
      transparent
      animationType="fade"
    >
      <ImagesModalView
        openImageIndex={openImageIndex}
        onClose={onClose}
        imageUrls={imageUrls}
      />
    </Modal>
  );
};

const ImagesModalView = ({ openImageIndex, onClose, imageUrls }: Props) => {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  const { height: windowHeight } = useWindowDimensions();

  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY > 200 || event.velocityY > 1000) {
        runOnJS(onClose)();
      } else {
        translateY.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: interpolate(
        translateY.value,
        [0, windowHeight],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Box flex={1}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.animatedView,
            { backgroundColor: colors.modalBackground },
            animatedStyle,
          ]}
        >
          <ImagesCarousel
            imageUrls={imageUrls}
            initialImageIndex={openImageIndex}
          />

          <Box
            position="absolute"
            top={insets.top + spacing.m}
            right={spacing.m}
          >
            <PressableOpacity hitSlop={10} onPress={onClose}>
              <Icon name="close" size={24} color={colors.contentInverse} />
            </PressableOpacity>
          </Box>
        </Animated.View>
      </GestureDetector>
    </Box>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    justifyContent: 'center',
  },
});
