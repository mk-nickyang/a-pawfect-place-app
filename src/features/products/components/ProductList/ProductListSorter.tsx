import type { ProductCollectionSortKeys } from '@shopify/hydrogen-react/storefront-api-types';
import { memo } from 'react';

import { ProductListSortId } from '../../utils/constants';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = {
  value: ProductListSortId;
  onChange: (newSortKey: ProductCollectionSortKeys) => void;
};

const DEFAULT_SORT_IDS: ProductListSortId[] = [
  'BEST_SELLING',
  'CREATED',
  'TITLE_ASC',
  'TITLE_DESC',
  'PRICE_ASC',
  'PRICE_DESC',
];

export const ProductListSorter = memo(({ value, onChange }: Props) => {
  return (
    <PressableOpacity>
      <Box p="s" borderRadius={6} borderWidth={1} borderColor="borderPrimary">
        <Text>Sort: {ProductListSortId[value]}</Text>
      </Box>
    </PressableOpacity>
  );
});

ProductListSorter.displayName = 'ProductListSorter';
