import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { useMyAccount } from '../api/useMyAccount';
import { useShopInfo } from '../api/useShopInfo';
import { AccountListButton } from '../components/AccountListButton';
import { AppearanceButton } from '../components/AppearanceButton';
import { LogOutButton } from '../components/LogOutButton';

import { AppVersion } from '@/components/AppVersion';
import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

export const Account = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Account'>) => {
  const { colors } = useTheme();

  useWarmUpBrowser();

  const { login, authenticationStatus } = useAuth();

  const { data: account, isLoading } = useMyAccount({
    enabled: authenticationStatus === AuthenticationStatus.AUTHENTICATED,
  });

  const { data: shop } = useShopInfo();

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
            <PressableOpacity hitSlop={10} onPress={login}>
              <Text textDecorationLine="underline">Sign in or register</Text>
            </PressableOpacity>

            <Text> to manage your account.</Text>
          </Box>
        )}
      </Box>

      {account ? (
        <Box mb="m">
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
        noBorder
        marginBottom
        label="Terms of Service"
        onPress={() =>
          navigation.navigate('Legal', {
            title: 'Terms of Service',
            html: shop?.termsOfService?.body,
          })
        }
      />

      <AppearanceButton />

      {account ? <LogOutButton /> : null}

      <AppVersion />

      <LoadingOverlay
        visible={
          isLoading ||
          authenticationStatus === AuthenticationStatus.AUTHENTICATING
        }
      />
    </ScrollView>
  );
};
