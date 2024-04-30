import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useRef } from 'react';
import type { SearchBarCommands } from 'react-native-screens';

import { useSearchBarActions } from '../store/productsSearch';

import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import type { RootStackParamList } from '@/navigation/types';

export const useHeaderSearchBar = (
  navigation: NativeStackNavigationProp<RootStackParamList, 'Products'>,
) => {
  const searchBarRef = useRef<SearchBarCommands>(null);

  const { focusSearchBar, unFocusSearchBar, updateSearchQuery } =
    useSearchBarActions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableOpacity
          hitSlop={10}
          onPress={() => searchBarRef.current?.focus()}
        >
          <Icon name="magnify" size={24} />
        </PressableOpacity>
      ),
      headerSearchBarOptions: {
        ref: searchBarRef,
        placeholder: 'Search by Keyword',
        onFocus: focusSearchBar,
        onBlur: unFocusSearchBar,
        onChangeText: (e) => updateSearchQuery(e.nativeEvent.text),
      },
    });
  }, [focusSearchBar, navigation, unFocusSearchBar, updateSearchQuery]);
};
