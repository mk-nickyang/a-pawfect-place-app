import { useQuery } from '@tanstack/react-query';

import { myAccountQuery } from './myAccountQuery';

export const useMyAccount = (options: { enabled: boolean }) => {
  return useQuery({
    ...myAccountQuery,
    enabled: options.enabled,
  });
};
