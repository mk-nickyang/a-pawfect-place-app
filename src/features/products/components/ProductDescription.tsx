import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import { memo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';

import { useTheme } from '@/theme';

type Props = { descriptionHtml: string };

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

export const ProductDescription = memo(({ descriptionHtml }: Props) => {
  const { width: windowWidth } = useWindowDimensions();

  const { spacing } = useTheme();

  return (
    <RenderHtml
      contentWidth={windowWidth - spacing.m * 2}
      source={{ html: descriptionHtml }}
      ignoredDomTags={['meta']}
      // iframe support
      renderers={renderers}
      WebView={WebView}
      customHTMLElementModels={customHTMLElementModels}
      renderersProps={{
        iframe: {
          scalesPageToFit: true,
        },
      }}
    />
  );
});

ProductDescription.displayName = 'ProductDescription';
