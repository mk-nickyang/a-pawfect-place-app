import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

type Props = {
  title: string;
  bold?: boolean;
  arrow?: boolean;
  onPress: () => void;
  noBorder?: boolean;
};

export const CollectionListButton = ({
  title,
  bold,
  arrow,
  onPress,
  noBorder,
}: Props) => {
  const { colors } = useTheme();

  return (
    <PressableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="m"
        borderBottomWidth={noBorder ? 0 : StyleSheet.hairlineWidth}
        borderBottomColor="borderPrimary"
      >
        <Text variant={bold ? 'h3' : 'body1'}>{title}</Text>

        {arrow ? (
          <Icon
            name="chevron-right"
            size={24}
            color={colors.contentSecondary}
          />
        ) : null}
      </Box>
    </PressableOpacity>
  );
};
