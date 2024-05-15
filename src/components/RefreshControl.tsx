import { useState } from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';

import { useTheme } from '@/theme';

type Props = { onRefresh: () => Promise<unknown> };

export const RefreshControl = ({ onRefresh }: Props) => {
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
    />
  );
};
