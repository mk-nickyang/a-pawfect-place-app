import { useQueryClient } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

import { useEvent } from '@/hooks/useEvent';
import { Auth } from '@/modules/auth';
import { Logger } from '@/modules/logger';
import { myAccountQuery } from '@/screens/account/api/myAccountQuery';
import { useUpdateCartBuyerIdentity } from '@/screens/cart/api/useUpdateCartBuyerIdentity';
import { useCartId } from '@/screens/cart/useCartId';

export const AuthenticationStatus = {
  AUTHENTICATING: 'AUTHENTICATING',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AuthenticationStatus = keyof typeof AuthenticationStatus;

type AuthContextType = {
  authenticationStatus: AuthenticationStatus;
  login: () => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>(() =>
      Auth.getStoredAccessToken()
        ? AuthenticationStatus.AUTHENTICATED
        : AuthenticationStatus.UNAUTHENTICATED,
    );

  const queryClient = useQueryClient();

  const { cartId } = useCartId();

  const updateCartBuyerIdentityMutation = useUpdateCartBuyerIdentity();

  // Check auth session and refetch account data when app opens
  const checkAuthSession = useEvent(async () => {
    if (authenticationStatus !== AuthenticationStatus.AUTHENTICATED) return;

    try {
      await Auth.refreshAccessToken();
      // Fetch customer data and add customer data to cart
      await queryClient.invalidateQueries({
        queryKey: myAccountQuery.queryKey,
      });
    } catch (error) {
      /**
       * If refresh access token failed, it means either auth service errors or
       * user is logged out from other devices. Log user out.
       */
      await logOut();
      Logger.error(error);
    }
  });

  useEffect(() => {
    checkAuthSession();
  }, [checkAuthSession, queryClient]);

  const addBuyerIdentityToCart = useEvent(async () => {
    if (cartId) {
      const account = await queryClient.fetchQuery(myAccountQuery);
      updateCartBuyerIdentityMutation.mutate({
        cartId,
        email: account.emailAddress?.emailAddress,
      });
    }
  });

  const login = useCallback(async () => {
    setAuthenticationStatus(AuthenticationStatus.AUTHENTICATING);

    try {
      const loginUrl = Auth.generateLoginUrl();
      const authSessionResult = await openAuthSessionAsync(loginUrl);

      if (authSessionResult.type === 'success' && authSessionResult.url) {
        const { queryParams } = Linking.parse(authSessionResult.url);
        const code = queryParams?.['code'];
        if (code && typeof code === 'string') {
          // Fetch and store auth token
          await Auth.setupAccessToken(code);
          // Fetch customer data and add customer data to cart
          await addBuyerIdentityToCart();

          setAuthenticationStatus(AuthenticationStatus.AUTHENTICATED);
        }
      } else {
        setAuthenticationStatus(AuthenticationStatus.UNAUTHENTICATED);
      }
    } catch (error) {
      Logger.error(error);
      setAuthenticationStatus(AuthenticationStatus.UNAUTHENTICATED);
    }
  }, [addBuyerIdentityToCart]);

  const removeBuyerIdentityFromCart = useEvent(() => {
    if (cartId) {
      updateCartBuyerIdentityMutation.mutate({
        cartId,
        email: undefined,
      });
    }
  });

  const logOut = useCallback(async () => {
    // Remove account query cache
    queryClient.removeQueries({ queryKey: myAccountQuery.queryKey });

    try {
      await Auth.logOut();
    } catch (error) {
      Logger.error(error);
    }

    await Auth.removeAuthToken();

    removeBuyerIdentityFromCart();

    setAuthenticationStatus(AuthenticationStatus.UNAUTHENTICATED);
  }, [queryClient, removeBuyerIdentityFromCart]);

  const authContextValue = useMemo(
    () => ({ authenticationStatus, login, logOut }),
    [authenticationStatus, login, logOut],
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
