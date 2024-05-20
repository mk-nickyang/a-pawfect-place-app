import { StyleSheet } from 'react-native';

import { Box } from './Box';
import { Icon } from './Icon';

import { useTheme } from '@/theme';

type Props = { value: number; size?: 'small' | 'large' };

export const Rating = ({ value, size }: Props) => {
  const { colors } = useTheme();

  // Make sure rating value is between 1 - 5
  const adjustedRating = Math.max(1, Math.min(value, 5));

  const iconSize = size === 'large' ? 20 : 16;

  return (
    <Box flexDirection="row" alignItems="center" style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => {
        const diff = adjustedRating - (index + 1);
        return (
          <Icon
            key={index}
            name={
              diff >= 0 ? 'star' : diff > -1 ? 'star-half-full' : 'star-outline'
            }
            size={iconSize}
            color={colors.ratingBackground}
          />
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -2,
  },
});
