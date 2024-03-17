import type { SelectedOption } from '@shopify/hydrogen-react/storefront-api-types';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme, { useTheme } from '@/theme';

type Props = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (newSelectedOption: SelectedOption) => void;
};

const OPTION_BOX_SIZE = 44;

export const ProductOptionItem = memo(
  ({ name, value, checked, onChange }: Props) => {
    const { colors } = useTheme();

    const isColorOption = name.toLowerCase() === 'color';

    let backgroundColor = checked
      ? theme.colors.contentPrimary
      : theme.colors.mainBackground;

    if (isColorOption) {
      backgroundColor = value.toLowerCase();
    }

    return (
      <PressableOpacity
        onPress={() => onChange({ name, value })}
        style={
          isColorOption
            ? [
                styles.container,
                {
                  borderColor: checked
                    ? colors.contentPrimary
                    : colors.transparent,
                },
              ]
            : []
        }
      >
        <View
          style={[
            styles.inner,
            {
              backgroundColor,
              borderWidth: isColorOption ? 2 : 1,
              borderColor: isColorOption
                ? colors.contentInverse
                : colors.borderPrimary,
              borderRadius: isColorOption ? OPTION_BOX_SIZE : 0,
            },
          ]}
        >
          {isColorOption ? null : (
            <Text color={checked ? 'contentInverse' : 'contentPrimary'}>
              {value}
            </Text>
          )}
        </View>
      </PressableOpacity>
    );
  },
);

ProductOptionItem.displayName = 'ProductOptionItem';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: OPTION_BOX_SIZE,
  },
  inner: {
    height: OPTION_BOX_SIZE,
    minWidth: OPTION_BOX_SIZE,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
