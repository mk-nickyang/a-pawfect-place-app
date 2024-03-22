import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { openBrowserAsync } from 'expo-web-browser';
import { Alert, ScrollView } from 'react-native';

import { AccountHeader } from './components/AccountHeader';
import { AccountListButton } from './components/AccountListButton';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
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
    link: `${SHOPIFY_WEBSITE_URL}/pages/pages/return-refund`,
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
  const { logOut, authenticationStatus } = useAuth();

  useWarmUpBrowser();

  const onLogOutPress = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: logOut },
    ]);
  };

  const isAuthed = authenticationStatus === AuthenticationStatus.AUTHENTICATED;

  return (
    <ScrollView>
      <AccountHeader />

      {isAuthed ? (
        <Box mb="m">
          <AccountListButton
            label="Personal Details"
            leftIcon={<Icon name="account-details" size={20} />}
            onPress={() => navigation.navigate('PersonalDetails')}
          />
          <AccountListButton
            label="Orders"
            leftIcon={<Icon name="package-variant-closed" size={20} />}
            onPress={() => navigation.navigate('Orders')}
          />
          <AccountListButton
            label="Delivery Address"
            leftIcon={<Icon name="truck-outline" size={20} />}
            onPress={() => navigation.navigate('DeliveryAddress')}
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
            rightIcon={<Icon name="open-in-new" size={20} />}
            noBorder={index === SHOPIFY_WEBSITE_FOOTER_PAGES.length - 1}
          />
        ))}
      </Box>

      {isAuthed ? (
        <AccountListButton
          label="Sign out"
          onPress={onLogOutPress}
          rightIcon={<Icon name="logout-variant" size={20} />}
          noBorder
        />
      ) : null}
    </ScrollView>
  );
};
