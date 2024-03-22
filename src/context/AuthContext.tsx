import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Auth } from '@/modules/auth';
import { Logger } from '@/modules/logger';

const AuthenticationStatus = {
  AUTHENTICATING: 'AUTHENTICATING',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type AuthenticationStatus = keyof typeof AuthenticationStatus;

type AuthContextType = {
  authenticationStatus: AuthenticationStatus;
  login: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>(() =>
      Auth.getStoredAccessToken()
        ? AuthenticationStatus.AUTHENTICATED
        : AuthenticationStatus.UNAUTHENTICATED,
    );

  const login = useCallback(async () => {
    setAuthenticationStatus(AuthenticationStatus.AUTHENTICATING);

    try {
      const loginUrl = await Auth.generateLoginUrl();
      const authSessionResult = await openAuthSessionAsync(loginUrl);

      if (authSessionResult.type === 'success' && authSessionResult.url) {
        const { queryParams } = Linking.parse(authSessionResult.url);
        const code = queryParams?.['code'];
        if (code && typeof code === 'string') {
          // Fetch and store auth token
          const authToken = await Auth.fetchAuthToken(code);
          console.log(authToken);
          await Auth.storeAuthToken(authToken);

          setAuthenticationStatus(AuthenticationStatus.AUTHENTICATED);
        }
      } else {
        setAuthenticationStatus(AuthenticationStatus.UNAUTHENTICATED);
      }
    } catch (error) {
      Logger.error(error);
      setAuthenticationStatus(AuthenticationStatus.UNAUTHENTICATED);
    }
  }, []);

  const authContextValue = useMemo(
    () => ({ authenticationStatus, login }),
    [authenticationStatus, login],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('AuthContext: No value provided');
  }
  return auth;
};
