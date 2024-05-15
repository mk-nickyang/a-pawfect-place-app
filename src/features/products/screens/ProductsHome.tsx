import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CollectionListButton } from '../components/CollectionListButton';
import { ProductsSearchBar } from '../components/ProductsSearch/ProductsSearchBar';
import { ProductsSearchOverlay } from '../components/ProductsSearch/ProductsSearchOverlay';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

const FEATURED_COLLECTIONS = [
  { title: 'Shop All', handle: 'all' },
  { title: 'Best Selling', handle: 'best-seller' },
  { title: 'New Arrivals', handle: 'new-arrivals' },
  { title: 'Sale', handle: 'sale' },
] as const;

const CATEGORY_COLLECTIONS = [
  { title: 'Dog Toys', handle: 'dog-toys' },
  { title: 'Cat Toys', handle: 'cat-toys' },
  { title: 'Pet Walk & Carriers', handle: 'dog-walks' },
  { title: 'Pet Wear & Accessories', handle: 'dog-wear' },
  { title: 'Pet Grooming', handle: 'grooming' },
  { title: 'Pet Bed', handle: 'dog-beds' },
  { title: 'Pawfect Human Accessories ', handle: 'human' },
] as const;

export const ProductsHome = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProductsHome'>) => {
  const { spacing } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      backgroundColor="screenBackground"
      style={{ paddingTop: insets.top || spacing.s }}
    >
      <ProductsSearchBar />

      <ScrollView keyboardShouldPersistTaps="handled">
        {FEATURED_COLLECTIONS.map((collection, index) => (
          <CollectionListButton
            key={collection.handle}
            title={collection.title}
            bold
            noBorder={index === FEATURED_COLLECTIONS.length - 1}
            onPress={() =>
              navigation.navigate('CollectionProducts', {
                collectionHandle: collection.handle,
                collectionTitle: collection.title,
              })
            }
          />
        ))}

        <Box px="m" pt="l" p="m" backgroundColor="secondaryBackground">
          <Text variant="h3">Shop by category</Text>
        </Box>

        {CATEGORY_COLLECTIONS.map((collection) => (
          <CollectionListButton
            key={collection.handle}
            title={collection.title}
            arrow
            onPress={() =>
              navigation.navigate('CollectionProducts', {
                collectionHandle: collection.handle,
                collectionTitle: collection.title,
              })
            }
          />
        ))}
      </ScrollView>

      <ProductsSearchOverlay />
    </Box>
  );
};
