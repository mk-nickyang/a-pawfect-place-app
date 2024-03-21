import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { memo, useState } from 'react';

import { Button } from '@/components/Button';
import { Auth } from '@/modules/auth';

export const LoginButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    setIsLoading(true);

    try {
      const loginUrl = await Auth.generateLoginUrl();
      const authSessionResult = await openAuthSessionAsync(loginUrl);

      if (authSessionResult.type === 'success' && authSessionResult.url) {
        const { queryParams } = Linking.parse(authSessionResult.url);
        const code = queryParams?.['code'];
        if (code && typeof code === 'string') {
          await Auth.fetchAuthToken(code);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return <Button label="LOGIN" loading={isLoading} onPress={onLogin} />;
});

LoginButton.displayName = 'LoginButton';
