import * as Application from 'expo-application';

import { Box } from './Box';

import { Text } from '@/components/Text';

export const AppVersion = () => {
  return (
    <Box pb="l">
      <Text color="contentSecondary" textAlign="center">
        Version {Application.nativeApplicationVersion} (
        {Application.nativeBuildVersion})
      </Text>
    </Box>
  );
};
