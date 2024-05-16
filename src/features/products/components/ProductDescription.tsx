import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import { memo } from 'react';
import { WebView } from 'react-native-webview';

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
  );
});

ProductDescription.displayName = 'ProductDescription';
