import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import { useProductsSearchActions } from '@/features/products/store/productsSearch';
import type { RootStackParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeHeader = ({ navigation }: Props) => {
  const { showSearch } = useProductsSearchActions();

  return (
    <>
      <Box py="s" backgroundColor="announcementBarBackground">
        <Text textAlign="center">🚚 Free shipping on orders over $50</Text>
      </Box>

      <Box py="m" alignItems="center">
        <Logo />

        <Box
          position="absolute"
          right={16}
          top={0}
          bottom={0}
          justifyContent="center"
        >
          <PressableOpacity
            hitSlop={12}
            onPress={() => {
              showSearch();
              navigation.navigate('ProductsTab', { screen: 'ProductsHome' });
            }}
          >
            <Icon name="magnify" size={24} />
          </PressableOpacity>
        </Box>
      </Box>
    </>
  );
};
