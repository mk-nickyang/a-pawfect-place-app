import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

import { useProduct } from '../api/useProduct';
import { ProductDescription } from '../components/ProductDescription';
import { ProductForm } from '../components/ProductForm/ProductForm';
import { ProductImages } from '../components/ProductImages';
import { ProductRecommendations } from '../components/ProductRecommendations';

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

  if (!product) return null;

  return (
    <ScrollView>
      {product.images.edges.length > 0 ? (
        <ProductImages images={product.images} />
      ) : null}

      <Box p="m" backgroundColor="mainBackground">
        <Text variant="h2">{product.title}</Text>

        <ProductForm product={product} />

        <Text variant="h2">Description</Text>
        <ProductDescription descriptionHtml={product.descriptionHtml} />

        <ProductRecommendations productId={product.id} />
      </Box>
    </ScrollView>
  );
};
