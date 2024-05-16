import type {
  PriceRangeFilter,
  ProductFilter,
} from '@shopify/hydrogen-react/storefront-api-types';
import {
  memo,
  useRef,
  type Dispatch,
  type SetStateAction,
  type RefObject,
  useImperativeHandle,
} from 'react';
import { ScrollView, Switch, TextInput, StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Icon } from '@/components/Icon';
import { Modal, type ModalRef } from '@/components/Modal';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useThemeMode } from '@/context/ThemeContext';
import { useTheme } from '@/theme';

type Props = {
  value: ProductFilter;
  onChange: Dispatch<SetStateAction<ProductFilter>>;
};

export const ProductListFilter = memo(({ value: filters, onChange }: Props) => {
  const modalRef = useRef<ModalRef>(null);

  const minPriceInputRef = useRef<PriceRangeInputRef>(null);
  const maxPriceInputRef = useRef<PriceRangeInputRef>(null);

  const { colors } = useTheme();

  const onOutOfStockFilterToggle = (value: boolean) => {
    onChange((prevFilters) => ({
      ...prevFilters,
      available: value ? true : undefined,
    }));
  };

  const onPriceRangeFilterApply = () => {
    const minPriceString = minPriceInputRef.current?.getValue();
    const maxPriceString = maxPriceInputRef.current?.getValue();

    const priceRangeFilter: PriceRangeFilter = {};

    if (minPriceString) {
      const minPrice = parseFloat(minPriceString);
      if (!Number.isNaN(minPrice) && minPrice > 0) {
        priceRangeFilter.min = minPrice;
      }
    }

    if (maxPriceString) {
      const maxPrice = parseFloat(maxPriceString);
      if (!Number.isNaN(maxPrice) && maxPrice > 0) {
        priceRangeFilter.max = maxPrice;
      }
    }

    onChange((prevFilters) => ({
      ...prevFilters,
      price: priceRangeFilter,
    }));

    modalRef.current?.close();
  };

  const onFiltersClear = () => {
    onChange({});
    modalRef.current?.close();
  };

  const appliedFiltersCount =
    (filters.available ? 1 : 0) +
    (filters.price?.min || filters.price?.max ? 1 : 0);

  return (
    <>
      <PressableOpacity onPress={() => modalRef.current?.present()}>
        <Box
          p="s"
          flexDirection="row"
          alignItems="center"
          g="s"
          borderRadius={6}
          borderWidth={1}
          borderColor="borderPrimary"
        >
          <Icon name="filter-variant" size={20} color={colors.contentPrimary} />
          <Text>
            Filter{appliedFiltersCount > 0 ? ` (${appliedFiltersCount})` : ''}
          </Text>
        </Box>
      </PressableOpacity>

      <Modal modalRef={modalRef} size="large">
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="m"
          >
            <Text variant="h3">Filters</Text>
            <PressableOpacity
              hitSlop={12}
              onPress={() => modalRef.current?.close()}
            >
              <Icon name="close" size={20} color={colors.contentPrimary} />
            </PressableOpacity>
          </Box>

          <Box
            py="m"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text variant="body1">Exclude out of stock products</Text>
            <Switch
              value={Boolean(filters.available)}
              onValueChange={onOutOfStockFilterToggle}
            />
          </Box>

          <Divider />

          <Box py="m">
            <Text variant="body1">Price range</Text>

            <Box flexDirection="row" pt="m" pb="l" g="l">
              <PriceRangeInput
                inputRef={minPriceInputRef}
                defaultValue={filters.price?.min ?? undefined}
                placeholder="Min (optional)"
              />

              <PriceRangeInput
                inputRef={maxPriceInputRef}
                defaultValue={filters.price?.max ?? undefined}
                placeholder="Max (optional)"
              />
            </Box>

            <Button
              variant="primary"
              label="APPLY"
              onPress={onPriceRangeFilterApply}
            />
          </Box>

          <Button
            variant="secondary"
            label="CLEAR ALL"
            onPress={onFiltersClear}
          />
        </ScrollView>
      </Modal>
    </>
  );
});

ProductListFilter.displayName = 'ProductListFilter';

type PriceRangeInputRef = { getValue: () => string };

type PriceRangeInputProps = {
  inputRef: RefObject<PriceRangeInputRef>;
  defaultValue?: number;
  placeholder: string;
};

const PriceRangeInput = ({
  inputRef,
  defaultValue,
  placeholder,
}: PriceRangeInputProps) => {
  const defaultValueString =
    defaultValue === undefined ? '' : defaultValue.toString();

  const inputValueRef = useRef(defaultValueString);

  const { colors } = useTheme();
  const themeMode = useThemeMode();

  useImperativeHandle(inputRef, () => ({
    getValue: () => inputValueRef.current,
  }));

  return (
    <Box flex={1} flexDirection="row" alignItems="center" g="s">
      <Text>$</Text>
      <Box
        flex={1}
        px="s"
        height={40}
        borderWidth={1}
        borderColor="borderPrimary"
        borderRadius={3}
      >
        <TextInput
          defaultValue={defaultValueString}
          placeholder={placeholder}
          onChangeText={(text) => (inputValueRef.current = text)}
          inputMode="decimal"
          placeholderTextColor={colors.contentSecondary}
          keyboardAppearance={themeMode}
          style={[styles.input, { color: colors.contentPrimary }]}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
  },
});
