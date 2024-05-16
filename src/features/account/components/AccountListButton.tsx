import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

type Props = {
  onPress: () => void;
  label: string;
  leftIcon?: JSX.Element;
  rightElement?: JSX.Element;
  noBorder?: boolean;
  marginBottom?: boolean;
};

export const AccountListButton = ({
  onPress,
  label,
  leftIcon,
  rightElement,
  noBorder,
  marginBottom,
}: Props) => {
  const { colors } = useTheme();

  return (
    <PressableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="mainBackground"
        padding="m"
        mb={marginBottom ? 'm' : undefined}
        borderBottomWidth={noBorder ? 0 : StyleSheet.hairlineWidth}
        borderBottomColor="borderPrimary"
      >
        <Box flexDirection="row" alignItems="center" g="s">
          {leftIcon}
          <Text variant="body1">{label}</Text>
        </Box>

        {rightElement || (
          <Icon
            name="chevron-right"
            size={24}
            color={colors.contentSecondary}
          />
        )}
      </Box>
    </PressableOpacity>
  );
};
