import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = { quantity: number };

const QUANTITY_BUTTON_SIZE = 40;

export const LineItemQuantity = ({ quantity }: Props) => {
  return (
    <Box mb="s" flexDirection="row" borderWidth={1} borderColor="borderPrimary">
      <PressableOpacity style={styles.box}>
        <Text>-</Text>
      </PressableOpacity>

      <Box
        style={styles.box}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderColor="borderPrimary"
      >
        <Text>{quantity}</Text>
      </Box>

      <PressableOpacity style={styles.box}>
        <Text>+</Text>
      </PressableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  box: {
    width: QUANTITY_BUTTON_SIZE,
    height: QUANTITY_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
