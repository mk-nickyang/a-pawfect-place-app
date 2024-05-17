import type { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';
import { useSelectedThemeMode } from '@/context/ThemeContext';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

export const Account = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Account'>) => {
  const { colors } = useTheme();

  const { selectedThemeMode } = useSelectedThemeMode();

  useWarmUpBrowser();

  const { login, logOut, authenticationStatus } = useAuth();

  const { data: account, isLoading } = useMyAccount({
    enabled: authenticationStatus === AuthenticationStatus.AUTHENTICATED,
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
            leftIcon={
              <Icon
                name="package-variant-closed"
                size={20}
                color={colors.contentPrimary}
              />
            }
            onPress={() => navigation.navigate('Orders')}
            noBorder
          />
        </Box>
      ) : null}

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

      <AccountListButton
        noBorder
        marginBottom
        label="Appearance"
        rightElement={
          <Box flexDirection="row" alignItems="center" g="xs">
            <Text
              color="contentSecondary"
              variant="body1"
              textTransform="capitalize"
            >
              {selectedThemeMode}
            </Text>
            <Icon
              name="chevron-right"
              size={24}
              color={colors.contentSecondary}
            />
          </Box>
        }
        onPress={() => navigation.navigate('Appearance')}
      />

      {account ? (
        <AccountListButton
          noBorder
          marginBottom
          label="Sign out"
          onPress={onLogOutPress}
          rightElement={
            <Icon
              name="logout-variant"
              size={20}
              color={colors.contentSecondary}
            />
          }
        />
      ) : null}

      <AppVersion />

      <LoadingOverlay visible={isLoading} />
    </ScrollView>
  );
};
