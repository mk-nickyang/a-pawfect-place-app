import { memo } from 'react';

import { Button } from '@/components/Button';

export const LoginButton = memo(() => {
  return <Button label="LOGIN" onPress={() => {}} />;
});

LoginButton.displayName = 'LoginButton';
