import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { PressableOpacity } from './PressableOpacity';
import { Text } from './Text';

import { useTheme } from '@/theme';

type Props = {
  label: string;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ label, loading, onPress, disabled, style }: Props) => {
  const { colors } = useTheme();

  return (
    <PressableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: disabled ? colors.disabled : colors.contentPrimary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.contentInverse} />
      ) : (
        <Text fontWeight="600" letterSpacing={0.5} color="contentInverse">
          {label}
        </Text>
      )}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
