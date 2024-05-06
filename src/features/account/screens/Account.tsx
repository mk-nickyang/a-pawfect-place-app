import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { openBrowserAsync } from 'expo-web-browser';
import { Alert, ScrollView } from 'react-native';

import { useMyAccount } from '../api/useMyAccount';
import { AccountListButton } from '../components/AccountListButton';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { SHOPIFY_WEBSITE_URL } from '@/config';
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import type { RootStackParamList } from '@/navigation/types';

const SHOPIFY_WEBSITE_FOOTER_PAGES = [
  {
    label: 'Shipping Policy',
    link: `${SHOPIFY_WEBSITE_URL}/pages/shipping-and-delivery`,
  },
  {
    label: 'Return Policy',
    link: `${SHOPIFY_WEBSITE_URL}/pages/return-refund`,
  },
  { label: 'Contact Us', link: `${SHOPIFY_WEBSITE_URL}/pages/contact-us` },
  {
    label: 'Privacy Policy',
    link: `${SHOPIFY_WEBSITE_URL}/policies/privacy-policy`,
  },
  {
    label: 'Terms of Service',
    link: `${SHOPIFY_WEBSITE_URL}/policies/terms-of-service`,
  },
] as const;

export const Account = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Account'>) => {
  useWarmUpBrowser();

  const { login, logOut, authenticationStatus } = useAuth();

  const { data: account, isLoading } = useMyAccount({
    enabled: authenticationStatus === AuthenticationStatus.AUTHENTICATED,
  });

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

      {account ? (
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
        {SHOPIFY_WEBSITE_FOOTER_PAGES.map((page, index) => (
          <AccountListButton
            key={page.link}
            label={page.label}
            onPress={() => openBrowserAsync(page.link)}
            noBorder={index === SHOPIFY_WEBSITE_FOOTER_PAGES.length - 1}
          />
        ))}
      </Box>

      {account ? (
        <AccountListButton
          label="Sign out"
          onPress={onLogOutPress}
          rightIcon={<Icon name="logout-variant" size={20} />}
          noBorder
        />
      ) : null}

      <LoadingOverlay visible={isLoading} />
    </ScrollView>
  );
};
