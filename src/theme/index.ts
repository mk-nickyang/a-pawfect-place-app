import { createTheme, useTheme as _useTheme } from '@shopify/restyle';

const palette = {
  black: '#212121',
  white: '#FFFFFF',

  lightGrey: '#e3e3e3',
  grey: '#8a8a8a',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    transparent: 'transparent',

    contentPrimary: palette.black,
    contentSecondary: palette.grey,
    contentInverse: palette.white,
    borderPrimary: palette.lightGrey,
    disabled: palette.grey,

    saleBadgeBackground: '#f00c',
    soldOutBadgeBackground: palette.black,
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
      fontSize: 34,
      lineHeight: 42.5,
    },
    h2: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 32,
    },
    h3: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
    defaults: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => _useTheme<Theme>();

export default theme;
