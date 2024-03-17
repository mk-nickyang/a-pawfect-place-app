import { StyleSheet } from 'react-native';

import { PressableOpacity } from './PressableOpacity';
import { Text } from './Text';

import { useTheme } from '@/theme';

type Props = { label: string; onPress: () => void; disabled?: boolean };

export const Button = ({ label, onPress, disabled }: Props) => {
  const { colors } = useTheme();

  return (
    <PressableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: disabled ? colors.disabled : colors.contentPrimary },
      ]}
    >
      <Text fontWeight="600" letterSpacing={0.5} color="contentInverse">
        {label}
      </Text>
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
