import { ActivityIndicator, Modal } from 'react-native';

import { Box } from './Box';

import { useTheme } from '@/theme';

type Props = { visible: boolean };

export const LoadingOverlay = ({ visible }: Props) => {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="backdropBackground"
      >
        <ActivityIndicator size="large" color={colors.contentInverse} />
      </Box>
    </Modal>
  );
};
