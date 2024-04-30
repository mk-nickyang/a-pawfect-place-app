import { memo, useCallback, useEffect, useRef } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';

import {
  useIsProductsSearchShowing,
  useProductsSearchActions,
  useSearchQuery,
} from '../../store/productsSearch';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

export const PRODUCTS_SEARCH_BAR_HEIGHT = 48;

export const ProductsSearchBar = memo(() => {
  const inputRef = useRef<TextInput>(null);

  const { colors } = useTheme();

  const searchQuery = useSearchQuery();
  const { showSearch, hideSearch } = useProductsSearchActions();

  useEffect(
    function syncSearchInput() {
      inputRef.current?.setNativeProps({ text: searchQuery });
    },
    [searchQuery],
  );

  const onFocus = () => {
    showSearch();
  };

  const onCancel = useCallback(() => {
    Keyboard.dismiss();
    hideSearch();
  }, [hideSearch]);

  return (
    <Box
      height={PRODUCTS_SEARCH_BAR_HEIGHT}
      flexDirection="row"
      px="m"
      pb="s"
      g="m"
    >
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        px="s"
        g="xs"
        borderRadius={6}
        backgroundColor="inputBackground"
      >
        <Icon name="magnify" size={24} color={colors.contentSecondary} />

        <TextInput
          ref={inputRef}
          onFocus={onFocus}
          placeholder="Search by Keyword"
          placeholderTextColor={colors.contentSecondary}
          clearButtonMode="while-editing"
          allowFontScaling={false}
          autoCapitalize="none"
          autoCorrect={false}
          enterKeyHint="search"
          returnKeyType="search"
          style={styles.input}
        />
      </Box>

      <SearchBarCancelButton onCancel={onCancel} />
    </Box>
  );
});

ProductsSearchBar.displayName = 'ProductsSearchBar';

type SearchBarCancelButtonProps = { onCancel: () => void };

const SearchBarCancelButton = memo(
  ({ onCancel }: SearchBarCancelButtonProps) => {
    const isProductsSearchShowing = useIsProductsSearchShowing();

    if (!isProductsSearchShowing) return null;

    return (
      <PressableOpacity
        hitSlop={16}
        onPress={onCancel}
        style={styles.cancelButton}
      >
        <Text>Cancel</Text>
      </PressableOpacity>
    );
  },
);

SearchBarCancelButton.displayName = 'SearchBarCancelButton';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
  },
  cancelButton: {
    justifyContent: 'center',
  },
});
