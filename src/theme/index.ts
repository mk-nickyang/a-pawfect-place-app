import { createTheme, useTheme as _useTheme } from '@shopify/restyle';

const palette = {
  black: '#212121',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => _useTheme<Theme>();

export default theme;
