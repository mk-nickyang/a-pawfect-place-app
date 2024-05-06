import { Image } from 'expo-image';
import { memo } from 'react';

export const Logo = memo(() => {
  return <Image source={require('./assets/images/logo.png')} />;
});

Logo.displayName = 'Logo';
