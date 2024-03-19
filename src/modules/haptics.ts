import * as ExpoHaptics from 'expo-haptics';

export const Haptics = {
  impact: () => ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light),
};
