import { ActivityIndicator, FlexStyle } from 'react-native';

import { Box } from './Box';

type Props = { height?: FlexStyle['height']; flex?: number };

export const Loading = ({ height, flex }: Props) => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      height={height}
      flex={flex}
    >
      <ActivityIndicator />
    </Box>
  );
};
