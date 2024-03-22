import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';

export const useMyAccount = () => {
  const { authenticationStatus } = useAuth();

  return useQuery({
    queryFn: () => fetchCart(cartId),
    queryKey: ['account'],
    enabled: authenticationStatus === 'AUTHENTICATED',
  });
};
