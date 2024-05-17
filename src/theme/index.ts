import { DarkTheme } from '@react-navigation/native';
import { createTheme, useTheme as _useTheme } from '@shopify/restyle';

const palette = {
  black: '#212121',
  white: '#FFFFFF',
  lightGrey: '#e3e3e3',
  grey: '#8a8a8a',
  green: '#4caf50',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    secondaryBackground: 'rgba(0, 0, 0, 0.03)',
    screenBackground: palette.white,
    transparent: 'transparent',
    backdropBackground: 'rgba(0, 0, 0, 0.3)',

    contentPrimary: palette.black,
    contentSecondary: palette.grey,
    contentInverse: palette.white,
    borderPrimary: palette.lightGrey,

    disabled: palette.grey,
    success: palette.green,

    primaryButtonBackground: palette.black,
    primaryButtonText: palette.white,
    secondaryButtonBackground: palette.white,
    secondaryButtonText: palette.black,
    announcementBarBackground: '#fffba8',
    announcementBarText: palette.black,

    modalBackground: palette.black,
    badgeBackground: '#f00c',
    inputBackground: 'rgba(0, 0, 0, 0.03)',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    h1: {
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 36,
      color: 'contentPrimary',
    },
    h2: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 28,
      color: 'contentPrimary',
    },
    h3: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
      color: 'contentPrimary',
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
      color: 'contentPrimary',
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      color: 'contentPrimary',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: 'contentPrimary',
    },
    defaults: {
      fontSize: 14,
      lineHeight: 20,
      color: 'contentPrimary',
    },
  },
});

export const spacing = theme.spacing;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    secondaryBackground: 'rgba(255, 255, 255, 0.05)',
    screenBackground: DarkTheme.colors.background,

    contentPrimary: palette.white,
    borderPrimary: 'rgba(255, 255, 255, 0.3)',

    primaryButtonBackground: palette.white,
    primaryButtonText: palette.black,
    secondaryButtonBackground: palette.black,
    secondaryButtonText: palette.white,

    inputBackground: 'rgba(255, 255, 255, 0.1)',
  },
};

export type Theme = typeof theme;

export const useTheme = () => _useTheme<Theme>();

export default theme;
