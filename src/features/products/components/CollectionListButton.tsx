import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = {
  title: string;
  bold?: boolean;
  arrow?: boolean;
  onPress: () => void;
};

export const CollectionListButton = ({
  title,
  bold,
  arrow,
  onPress,
}: Props) => {
  return (
    <PressableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="m"
        borderBottomWidth={StyleSheet.hairlineWidth}
        borderBottomColor="borderPrimary"
      >
        <Text variant={bold ? 'h3' : 'body1'}>{title}</Text>

        {arrow ? <Icon name="chevron-right" size={24} /> : null}
      </Box>
    </PressableOpacity>
  );
};
