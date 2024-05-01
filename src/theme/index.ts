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
    transparent: 'transparent',
    backdropBackground: 'rgba(0, 0, 0, 0.3)',

    contentPrimary: palette.black,
    contentSecondary: palette.grey,
    contentInverse: palette.white,
    borderPrimary: palette.lightGrey,

    disabled: palette.grey,
    success: palette.green,

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
    },
    h2: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 28,
    },
    h3: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
    defaults: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => _useTheme<Theme>();

export default theme;
