import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { useProduct } from './api/useProduct';
import { ProductDescription } from './components/ProductDescription';
import { ProductImages } from './components/ProductImages';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';

export const Product = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Product'>) => {
  const { productId } = route.params;

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <Loading height="100%" />;

  return (
    <ScrollView>
      <ProductImages images={product.images} />

      <Box p="m" backgroundColor="mainBackground">
        <Text variant="subheader">{product.title}</Text>

        <ProductDescription descriptionHtml={product.descriptionHtml} />
      </Box>
    </ScrollView>
  );
};
