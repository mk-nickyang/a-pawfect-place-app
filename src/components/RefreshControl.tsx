import { useState } from 'react';
import {
  RefreshControl as RNRefreshControl,
  RefreshControlProps,
} from 'react-native';

import { useTheme } from '@/theme';

type Props = Omit<RefreshControlProps, 'onRefresh' | 'refreshing'> & {
  onRefresh: () => Promise<unknown>;
};

export const RefreshControl = ({ onRefresh, ...props }: Props) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const { colors } = useTheme();

  return (
    <RNRefreshControl
      refreshing={isRefetching}
      onRefresh={async () => {
        setIsRefetching(true);
        await onRefresh();
        setIsRefetching(false);
      }}
      tintColor={colors.contentPrimary}
      {...props}
    />
  );
};
