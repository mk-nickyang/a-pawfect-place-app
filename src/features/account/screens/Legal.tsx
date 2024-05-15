import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { HTMLView } from '@/components/HTMLView';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

export const Legal = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Legal'>) => {
  const { html } = route.params;

  const { spacing, colors } = useTheme();

  if (!html) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.mainBackground,
        padding: spacing.m,
      }}
    >
      <HTMLView source={{ html }} />
    </ScrollView>
  );
};
