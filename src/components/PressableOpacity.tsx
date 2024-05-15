import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { useThemeMode } from '@/context/ThemeContext';

type Props = Omit<PressableProps, 'style'> & {
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
};

export const PressableOpacity = ({
  activeOpacity,
  style,
  ...restProps
}: Props) => {
  const themeMode = useThemeMode();

  const defaultActiveOpacity = themeMode === 'dark' ? 0.8 : 0.2;

  return (
    <Pressable
      {...restProps}
      style={({ pressed }) => [
        style,
        { opacity: pressed ? activeOpacity || defaultActiveOpacity : 1 },
      ]}
    />
  );
};
