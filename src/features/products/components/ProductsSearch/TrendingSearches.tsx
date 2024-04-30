import { memo } from 'react';
import { Keyboard } from 'react-native';

import { useProductsSearchActions } from '../../store/productsSearch';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

const TRENDING_SEARCH_STRINGS = [
  'kangaroo sling',
  'shupatto',
  'bite me',
  'e-collar',
  'q-monster',
  'rosewood',
  'life jacket',
  'ball',
  'muzzle',
  'carrier',
] as const;

export const TrendingSearches = memo(() => {
  const { updateSearchQuery } = useProductsSearchActions();

  const onSearchStringPress = (searchString: string) => {
    Keyboard.dismiss();
    updateSearchQuery(searchString, { hideSearch: true });
  };

  return (
    <Box>
      <Text variant="h2" mb="m">
        Trending searches
      </Text>

      <Box flexDirection="row" flexWrap="wrap" g="s">
        {TRENDING_SEARCH_STRINGS.map((searchString) => (
          <PressableOpacity
            key={searchString}
            onPress={() => onSearchStringPress(searchString)}
          >
            <Box
              p="s"
              borderRadius={6}
              borderWidth={1}
              borderColor="borderPrimary"
            >
              <Text variant="body1">{searchString}</Text>
            </Box>
          </PressableOpacity>
        ))}
      </Box>
    </Box>
  );
});

TrendingSearches.displayName = 'TrendingSearches';
