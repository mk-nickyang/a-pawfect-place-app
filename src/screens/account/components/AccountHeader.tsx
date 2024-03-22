import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useAuth } from '@/context/AuthContext';

export const AccountHeader = () => {
  const { login, authenticationStatus } = useAuth();

  return (
    <Box backgroundColor="mainBackground" p="m">
      <Text variant="h3" mb="s">
        Hi there,
      </Text>

      <Box flexDirection="row">
        <PressableOpacity onPress={login}>
          <Text textDecorationLine="underline">Sign in or register</Text>
        </PressableOpacity>

        <Text> to manage your account.</Text>
      </Box>
    </Box>
  );
};
