import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text } from 'react-native';

import { useProduct } from './api/useProduct';
import { ProductDescription } from './components/ProductDescription';

import { Loading } from '@/components/Loading';
import type { RootStackParamList } from '@/navigation/types';

export const Product = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Product'>) => {
  const { productId } = route.params;

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <Loading height="100%" />;

  return (
    <ScrollView>
      <Text>{product.title}</Text>

      <ProductDescription descriptionHtml={product.descriptionHtml} />
    </ScrollView>
  );
};
