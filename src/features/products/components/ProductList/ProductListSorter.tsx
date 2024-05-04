import { memo, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import {
  ProductListSortId,
  PRODUCT_LIST_SORTER_BY_ID,
} from '../../utils/constants';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { Modal, type ModalRef } from '@/components/Modal';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = {
  availableSortIds: ProductListSortId[];
  value: ProductListSortId;
  onChange: (newSortId: ProductListSortId) => void;
};

export const ProductListSorter = memo(
  ({ availableSortIds, value, onChange }: Props) => {
    const modalRef = useRef<ModalRef>(null);

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
            <Icon name="sort" size={20} />
            <Text>Sort</Text>
          </Box>
        </PressableOpacity>

        <Modal modalRef={modalRef} size="medium">
          <ScrollView>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mb="m"
            >
              <Text variant="h3">Sort by</Text>
              <PressableOpacity
                hitSlop={12}
                onPress={() => modalRef.current?.close()}
              >
                <Icon name="close" size={20} />
              </PressableOpacity>
            </Box>

            {availableSortIds.map((sortId) => {
              const isSelected = sortId === value;
              return (
                <PressableOpacity
                  key={sortId}
                  onPress={() => {
                    if (!isSelected) {
                      onChange(sortId);
                    }
                    modalRef.current?.close();
                  }}
                >
                  <Box
                    py="m"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottomWidth={StyleSheet.hairlineWidth}
                    borderBottomColor="borderPrimary"
                  >
                    <Text
                      fontWeight={isSelected ? '600' : '400'}
                      variant="body1"
                    >
                      {PRODUCT_LIST_SORTER_BY_ID[sortId].label}
                    </Text>
                    {isSelected ? <Icon name="check" size={20} /> : null}
                  </Box>
                </PressableOpacity>
              );
            })}
          </ScrollView>
        </Modal>
      </>
    );
  },
);

ProductListSorter.displayName = 'ProductListSorter';
