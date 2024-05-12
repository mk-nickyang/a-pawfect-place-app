import type { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

import { Box } from '@/components/Box';

export const ArticleScreenContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box flex={1} bg="mainBackground">
      <ScrollView>
        <Box px="m" py="l" g="m">
          {children}
        </Box>
      </ScrollView>
    </Box>
  );
};
