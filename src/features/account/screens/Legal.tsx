import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

export const Legal = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Legal'>) => {
  const { html } = route.params;

  const { width: windowWidth } = useWindowDimensions();

  const { spacing, colors } = useTheme();

  if (!html) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.mainBackground,
        padding: spacing.m,
      }}
    >
      <RenderHtml
        contentWidth={windowWidth - spacing.m * 2}
        source={{ html }}
        ignoredDomTags={['meta']}
      />
    </ScrollView>
  );
};
