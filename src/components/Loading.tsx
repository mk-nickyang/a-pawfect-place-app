import { ActivityIndicator, FlexStyle } from 'react-native';

import { Box } from './Box';

type Props = { height?: FlexStyle['height'] };

export const Loading = ({ height }: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" height={height}>
      <ActivityIndicator />
    </Box>
  );
};
