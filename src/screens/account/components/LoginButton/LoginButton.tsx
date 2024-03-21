import { openAuthSessionAsync } from 'expo-web-browser';
import { memo, useState } from 'react';

import { getLoginUrl } from './getLoginUrl';

import { Button } from '@/components/Button';

export const LoginButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    setIsLoading(true);

    try {
      const loginUrl = await getLoginUrl();
      const response = await openAuthSessionAsync(loginUrl, 'apawfectplace://');
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return <Button label="LOGIN" loading={isLoading} onPress={onLogin} />;
});

LoginButton.displayName = 'LoginButton';
