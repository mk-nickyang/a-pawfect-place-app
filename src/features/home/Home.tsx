import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  HOME_COLLECTIONS,
  useHomeCollectionProducts,
} from './api/useHomeCollectionProducts';
import { HomeCollectionSection } from './components/HomeCollectionSection';
import { HomeHeader } from './components/HomeHeader';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import type { RootStackParamList } from '@/navigation/types';

const keyExtractor = (_item: ProductEdge[], index: number) =>
  HOME_COLLECTIONS[index]?.handle || `${index}`;

const renderItem: ListRenderItem<ProductEdge[]> = ({
  item: collectionProducts,
  index,
}) => (
  <HomeCollectionSection
    title={HOME_COLLECTIONS[index]?.title || ''}
    collectionHandle={HOME_COLLECTIONS[index]?.handle || ''}
    products={collectionProducts}
  />
);

export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useHomeCollectionProducts();

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      style={{ paddingTop: insets.top }}
    >
      <HomeHeader navigation={navigation} />

      {isLoading ? (
        <Loading flex={1} />
      ) : (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={1200}
          keyExtractor={keyExtractor}
        />
      )}
    </Box>
  );
};
