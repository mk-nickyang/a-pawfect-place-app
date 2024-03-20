import * as Linking from 'expo-linking';
import { memo, useEffect, useState } from 'react';

import { getAccessToken } from './getAccessToken';
import { getLoginUrl } from './getLoginUrl';

import { Button } from '@/components/Button';

export const LoginButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', async ({ url }) => {
      const { queryParams } = Linking.parse(url);
      if (queryParams?.code) {
        const authCode = queryParams.code as string;

        try {
          const accessToken = await getAccessToken(authCode);
          console.log(accessToken);
        } catch (error) {
          console.log(error);
        }

        setIsLoading(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onLogin = async () => {
    setIsLoading(true);

    try {
      const loginUrl = await getLoginUrl();
      Linking.openURL(loginUrl);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return <Button label="LOGIN" loading={isLoading} onPress={onLogin} />;
});

LoginButton.displayName = 'LoginButton';
