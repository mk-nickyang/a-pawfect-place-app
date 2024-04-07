import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = {
  onPress: () => void;
  label: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  noBorder?: boolean;
};

export const AccountListButton = ({
  onPress,
  label,
  leftIcon,
  rightIcon,
  noBorder,
}: Props) => {
  return (
    <PressableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="mainBackground"
        padding="m"
        borderBottomWidth={noBorder ? 0 : 1}
        borderBottomColor="borderPrimary"
      >
        <Box flexDirection="row" alignItems="center" g="s">
          {leftIcon}
          <Text>{label}</Text>
        </Box>

        {rightIcon || <Icon name="chevron-right" size={24} />}
      </Box>
    </PressableOpacity>
  );
};
