import { useQuery } from '@tanstack/react-query';

import { myAccountQuery } from './myAccountQuery';

export const useMyAccount = (enabled: boolean) => {
  return useQuery({
    ...myAccountQuery,
    staleTime: Infinity,
    enabled,
  });
};
