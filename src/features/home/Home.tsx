import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@/components/Box';

export const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      style={{ paddingTop: insets.top }}
    >
      {/* //TODO: LOGO */}
    </Box>
  );
};
