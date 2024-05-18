import { memo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { AccountListButton } from './AccountListButton';

import { Icon } from '@/components/Icon';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/theme';

export const LogOutButton = memo(() => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { colors } = useTheme();

  const { logOut } = useAuth();

  const onLogOutPress = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          setIsLoggingOut(true);
          await logOut();
          setIsLoggingOut(false);
        },
      },
    ]);
  };

  return (
    <AccountListButton
      noBorder
      marginBottom
      label="Sign out"
      onPress={onLogOutPress}
      rightElement={
        isLoggingOut ? (
          <ActivityIndicator size="small" />
        ) : (
          <Icon
            name="logout-variant"
            size={20}
            color={colors.contentSecondary}
          />
        )
      }
    />
  );
});

LogOutButton.displayName = 'LogOutButton';
