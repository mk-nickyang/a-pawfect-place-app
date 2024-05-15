import { useWindowDimensions } from 'react-native';
import RenderHtml, { type RenderHTMLProps } from 'react-native-render-html';

import { useTheme } from '@/theme';

export const HTMLView = (props: RenderHTMLProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const { spacing, colors } = useTheme();

  return (
    <RenderHtml
      contentWidth={windowWidth - spacing.m * 2}
      ignoredDomTags={['meta']}
      tagsStyles={{
        body: { color: colors.contentPrimary },
        a: { color: colors.contentPrimary },
      }}
      {...props}
    />
  );
};
