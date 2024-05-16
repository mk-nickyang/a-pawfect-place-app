import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';

import theme, { darkTheme } from '@/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_MODE_STORAGE_KEY = 'theme.mode';

export const useSelectedThemeMode = () => {
  const [themeMode, setThemeMode] = useMMKVString(THEME_MODE_STORAGE_KEY) as [
    ThemeMode | undefined,
    (newMode: ThemeMode) => void,
  ];
  return { selectedThemeMode: themeMode || 'system', setThemeMode };
};

export const useThemeMode = () => {
  const { selectedThemeMode } = useSelectedThemeMode();
  const systemTheme = useColorScheme();
  return selectedThemeMode === 'system'
    ? systemTheme ?? 'light'
    : selectedThemeMode;
};

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const themeMode = useThemeMode();

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : theme}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeProvider>
  );
};
