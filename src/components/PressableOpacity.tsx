import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style'> & {
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
};

export const PressableOpacity = ({
  activeOpacity = 0.2,
  style,
  ...restProps
}: Props) => {
  return (
    <Pressable
      {...restProps}
      style={({ pressed }) => [style, { opacity: pressed ? activeOpacity : 1 }]}
    />
  );
};
