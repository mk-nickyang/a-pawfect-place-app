import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';

import { AccountListButton } from './AccountListButton';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useSelectedThemeMode } from '@/context/ThemeContext';

export const AppearanceButton = memo(() => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const { selectedThemeMode } = useSelectedThemeMode();

  return (
    <AccountListButton
      noBorder
      marginBottom
      label="Appearance"
      rightElement={
        <Box flexDirection="row" alignItems="center" g="xs">
          <Text
            color="contentSecondary"
            variant="body1"
            textTransform="capitalize"
          >
            {selectedThemeMode}
          </Text>
          <Icon
            name="chevron-right"
            size={24}
            color={colors.contentSecondary}
          />
        </Box>
      }
      onPress={() => navigation.navigate('Appearance')}
    />
  );
});

AppearanceButton.displayName = 'AppearanceButton';
