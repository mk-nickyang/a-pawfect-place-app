import * as Application from 'expo-application';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';

export const AppVersion = () => {
  return (
    <Box py="l" alignItems="center">
      <Text color="contentSecondary">
        Version {Application.nativeApplicationVersion} (
        {Application.nativeBuildVersion})
      </Text>
    </Box>
  );
};
