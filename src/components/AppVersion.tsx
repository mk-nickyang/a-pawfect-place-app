import * as Application from 'expo-application';

import { Text } from '@/components/Text';

export const AppVersion = () => {
  return (
    <Text color="contentSecondary" textAlign="center">
      Version {Application.nativeApplicationVersion} (
      {Application.nativeBuildVersion})
    </Text>
  );
};
