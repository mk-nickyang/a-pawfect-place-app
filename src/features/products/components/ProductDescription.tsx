import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import { memo } from 'react';
import { WebView } from 'react-native-webview';

import { Box } from '@/components/Box';
import { HTMLView } from '@/components/HTMLView';

type Props = { descriptionHtml: string };

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

export const ProductDescription = memo(({ descriptionHtml }: Props) => {
  return (
    <Box mb="xl">
      <HTMLView
        source={{ html: descriptionHtml }}
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
    </Box>
  );
});

ProductDescription.displayName = 'ProductDescription';
