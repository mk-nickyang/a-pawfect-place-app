import * as Linking from 'expo-linking';
import { memo } from 'react';

import { getLoginUrl } from './getLoginUrl';

import { Button } from '@/components/Button';

export const LoginButton = memo(() => {
  const onLogin = async () => {
    try {
      const loginUrl = await getLoginUrl();
      Linking.openURL(loginUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button label="LOGIN" onPress={onLogin} />;
});

LoginButton.displayName = 'LoginButton';
