import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

const LOGO_HEIGHT = 32;
const LOGO_WIDTH_HEIGHT_RATIO = 2.5;

export const Logo = memo(() => {
  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.logo}
    />
  );
});

Logo.displayName = 'Logo';

const styles = StyleSheet.create({
  logo: {
    width: LOGO_HEIGHT * LOGO_WIDTH_HEIGHT_RATIO,
    height: LOGO_HEIGHT,
  },
});
