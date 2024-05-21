import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { Product as ShopifyProduct } from '@shopify/hydrogen-react/storefront-api-types';
import { shareAsync } from 'expo-sharing';
import { useCallback, useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';

import { useProduct } from '../api/useProduct';
import { ProductDescription } from '../components/ProductDescription';
import { ProductForm } from '../components/ProductForm/ProductForm';
import { ProductRating } from '../components/ProductRating';
import { ProductRecommendations } from '../components/ProductRecommendations';
import { ProductReviews } from '../components/ProductReviews/ProductReviews';

import { Box } from '@/components/Box';
import { Icon } from '@/components/Icon';
import { ImagesCarousel } from '@/components/ImagesCarousel';
import { Loading } from '@/components/Loading';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import type { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

type ProductViewProps = {
  product: ShopifyProduct;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Product'>;
};

const ProductView = ({ product, navigation }: ProductViewProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const productReviewsRef = useRef<View>(null);

  const { colors } = useTheme();

  useEffect(
    function setupProductShareButton() {
      navigation.setOptions({
        title: product.title,
        headerRight: () => {
          const productUrl = product.onlineStoreUrl;
          return productUrl ? (
            <PressableOpacity
              hitSlop={10}
              onPress={() => shareAsync(productUrl)}
            >
              <Icon
                name="tray-arrow-up"
                size={24}
                color={colors.contentPrimary}
              />
            </PressableOpacity>
          ) : null;
        },
      });
    },
    [colors.contentPrimary, navigation, product.onlineStoreUrl, product.title],
  );

  const scrollToReviews = useCallback(() => {
    if (scrollViewRef.current) {
      productReviewsRef.current?.measureLayout(
        scrollViewRef.current as unknown as View,
        (_left, top) => {
          scrollViewRef.current?.scrollTo({ y: top });
        },
      );
    }
  }, []);

  return (
    <ScrollView ref={scrollViewRef}>
      {product.images.edges.length > 0 ? (
        <ImagesCarousel
          imageUrls={product.images.edges.map((edge) => edge.node.url)}
        />
      ) : null}

      <Box p="m" backgroundColor="mainBackground">
        <Text variant="h2">{product.title}</Text>

        <ProductRating productId={product.id} onPress={scrollToReviews} />

        <ProductForm product={product} />

        <Text variant="h2">Description</Text>
        <ProductDescription descriptionHtml={product.descriptionHtml} />

        <ProductReviews
          productId={product.id}
          productReviewsRef={productReviewsRef}
          scrollToReviews={scrollToReviews}
        />

        <ProductRecommendations productId={product.id} />
      </Box>
    </ScrollView>
  );
};

export const Product = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Product'>) => {
  const { productId } = route.params;

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <Loading height="100%" />;

  if (!product)
    return (
      <Box p="m">
        <Text variant="body1">Product not found.</Text>
      </Box>
    );

  return <ProductView product={product} navigation={navigation} />;
};
