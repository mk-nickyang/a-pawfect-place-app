import { useNavigation } from '@react-navigation/native';
import { memo, type RefObject } from 'react';

import {
  BottomSheetModal,
  type BottomSheetModalRef,
} from '@/components/BottomSheetModal';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useTheme } from '@/theme';

type Props = { modalRef: RefObject<BottomSheetModalRef> };

export const CheckoutSuccessModal = memo(({ modalRef }: Props) => {
  const navigation = useNavigation();

  const { colors } = useTheme();

  return (
    <BottomSheetModal modalRef={modalRef} size="medium">
      <Box flex={1} justifyContent="space-between">
        <Box alignItems="center">
          <Icon name="check-circle" size={64} color={colors.success} />

          <Text variant="h3" mt="m" mb="s">
            YOUR ORDER IS CONFIRMED
          </Text>
          <Text variant="body1" color="contentSecondary" textAlign="center">
            You&apos;ll receive an email when your order is ready.
          </Text>
          <Text variant="body1" color="contentSecondary" textAlign="center">
            Or visit the Account tab to track your order status effortlessly.
          </Text>
        </Box>

        <Box g="s">
          <Button
            label="VIEW YOUR ORDER"
            onPress={() => {
              modalRef.current?.close();
              navigation.navigate('AccountTab', { screen: 'Account' });
            }}
          />

          <Button
            label="DONE"
            variant="secondary"
            onPress={() => modalRef.current?.close()}
          />
        </Box>
      </Box>
    </BottomSheetModal>
  );
});

CheckoutSuccessModal.displayName = 'CheckoutSuccessModal';
