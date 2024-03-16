import { memo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

type Props = { descriptionHtml: string };

export const ProductDescription = memo(({ descriptionHtml }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: descriptionHtml }}
      ignoredDomTags={['meta']}
    />
  );
});

ProductDescription.displayName = 'ProductDescription';
