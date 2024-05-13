import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, ScrollView } from 'react-native';

import { useMyAccount } from '../api/useMyAccount';
import { useShopInfo } from '../api/useShopInfo';
import { AccountListButton } from '../components/AccountListButton';

import { AppVersion } from '@/components/AppVersion';
import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { IS_ACCOUNT_ENABLED } from '@/config';
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import type { RootStackParamList } from '@/navigation/types';

export const Account = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Account'>) => {
  useWarmUpBrowser();

  const { login, logOut, authenticationStatus } = useAuth();

  const { data: account, isLoading } = useMyAccount({
    enabled:
      IS_ACCOUNT_ENABLED &&
      authenticationStatus === AuthenticationStatus.AUTHENTICATED,
  });

  const { data: shop } = useShopInfo();

  const onLogOutPress = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: logOut,
      },
    ]);
  };

  return (
    <ScrollView>
      {IS_ACCOUNT_ENABLED ? (
        <Box
          backgroundColor="mainBackground"
          px="m"
          pt="m"
          pb={account ? undefined : 'm'}
          mb={account ? undefined : 'm'}
        >
          <Text variant="h2" mb="s">
            Hi {account?.displayName || 'there'},
          </Text>

          {account ? (
            <Text variant="body1">Welcome to your account</Text>
          ) : (
            <Box flexDirection="row" alignItems="center">
              <PressableOpacity onPress={login}>
                <Text textDecorationLine="underline">Sign in or register</Text>
              </PressableOpacity>

              <Text> to manage your account.</Text>
            </Box>
          )}
        </Box>
      ) : null}

      {IS_ACCOUNT_ENABLED && account ? (
        <Box mb="m">
          {/* <AccountListButton
            label="Personal Details"
            leftIcon={<Icon name="account-details" size={20} />}
            onPress={() => navigation.navigate('PersonalDetails')}
          />
          <AccountListButton
            label="Delivery Address"
            leftIcon={<Icon name="truck-outline" size={20} />}
            onPress={() => navigation.navigate('DeliveryAddress')}
          /> */}
          <AccountListButton
            label="Orders"
            leftIcon={<Icon name="package-variant-closed" size={20} />}
            onPress={() => navigation.navigate('Orders')}
            noBorder
          />
        </Box>
      ) : null}

      <Box mb="m">
        <AccountListButton
          label="Shipping Policy"
          onPress={() => navigation.navigate('ShippingPolicy')}
        />

        <AccountListButton
          label="Return Policy"
          onPress={() => navigation.navigate('ReturnPolicy')}
        />
        <AccountListButton
          label="Contact Us"
          onPress={() => navigation.navigate('ContactUs')}
        />

        <AccountListButton
          label="Privacy Policy"
          onPress={() =>
            navigation.navigate('Legal', {
              title: 'Privacy Policy',
              html: shop?.privacyPolicy?.body,
            })
          }
        />

        <AccountListButton
          label="Terms of Service"
          onPress={() =>
            navigation.navigate('Legal', {
              title: 'Terms of Service',
              html: shop?.termsOfService?.body,
            })
          }
        />

        <Box pb="m" />

        {IS_ACCOUNT_ENABLED && account ? (
          <AccountListButton
            label="Sign out"
            onPress={onLogOutPress}
            rightIcon={<Icon name="logout-variant" size={20} />}
            noBorder
          />
        ) : null}
      </Box>

      <AppVersion />

      {IS_ACCOUNT_ENABLED ? <LoadingOverlay visible={isLoading} /> : null}
    </ScrollView>
  );
};
