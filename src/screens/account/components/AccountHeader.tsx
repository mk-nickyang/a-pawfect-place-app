import { useMyAccount } from '../api/useMyAccount';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { AuthenticationStatus, useAuth } from '@/context/AuthContext';

export const AccountHeader = () => {
  const { login, authenticationStatus } = useAuth();

  const { data: account, isLoading } = useMyAccount();

  const isAuthLoading =
    authenticationStatus === AuthenticationStatus.AUTHENTICATING;

  return (
    <Box
      backgroundColor="mainBackground"
      p="m"
      mb="m"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text variant="h3" mb="s">
          Hi {account?.displayName || 'there'},
        </Text>

        {account ? (
          <Text>Welcome to your account</Text>
        ) : (
          <Box flexDirection="row" alignItems="center">
            <PressableOpacity disabled={isAuthLoading} onPress={login}>
              <Text textDecorationLine="underline">Sign in or register</Text>
            </PressableOpacity>

            <Text> to manage your account.</Text>
          </Box>
        )}
      </Box>

      {isAuthLoading || isLoading ? <Loading /> : null}
    </Box>
  );
};
