import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useSelectedThemeMode, type ThemeMode } from '@/context/ThemeContext';
import { useTheme } from '@/theme';

const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];

export const Appearance = () => {
  const { colors } = useTheme();

  const { selectedThemeMode, setThemeMode } = useSelectedThemeMode();

  return (
    <Box p="m">
      <Box backgroundColor="mainBackground" borderRadius={6}>
        {THEME_MODES.map((themeMode, index) => (
          <PressableOpacity
            key={themeMode}
            onPress={() => setThemeMode(themeMode)}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              p="m"
              borderBottomColor="borderPrimary"
              borderBottomWidth={
                index === THEME_MODES.length - 1 ? 0 : StyleSheet.hairlineWidth
              }
            >
              <Text variant="body1" textTransform="capitalize">
                {themeMode}
              </Text>

              {selectedThemeMode === themeMode ? (
                <Icon name="check" size={20} color={colors.contentPrimary} />
              ) : null}
            </Box>
          </PressableOpacity>
        ))}
      </Box>
    </Box>
  );
};
