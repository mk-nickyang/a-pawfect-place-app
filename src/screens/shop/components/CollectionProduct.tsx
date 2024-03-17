import { useNavigation } from '@react-navigation/native';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

type Props = { product: Product };

export const CollectionProduct = ({ product }: Props) => {
  const navigation = useNavigation();

  /**
   * IF `availableForSale` is `false`,
   * - Product is sold out, display SOLD OUT tag;
   *
   * IF `compareAtPrice > price`,
   * - Product is on sale, display SALE tag and original price;
   *
   * IF `minVariantPrice` is NOT equal to `maxVariantPrice`,
   * - Product has variants with different prices, display 'from' min price;
   *
   * By default,
   * - display `minVariantPrice`.
   */
  const isSoldOut = !product.availableForSale;

  const compareAtPrice = product.compareAtPriceRange.minVariantPrice.amount;
  const currentPrice = product.priceRange.minVariantPrice.amount;

  const isOnSale =
    !!compareAtPrice && Number(compareAtPrice) > Number(currentPrice);

  const hasMultiplePrices =
    product.priceRange.maxVariantPrice.amount !== currentPrice;

  return (
    <PressableOpacity
      onPress={() => navigation.navigate('Product', { productId: product.id })}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.featuredImage.url}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Box p="s">
        <Text>{product.title}</Text>

        <Box flexDirection="row" gap="s">
          <Text>
            {hasMultiplePrices ? 'from ' : ''}${currentPrice}
          </Text>
          {isOnSale ? (
            <Text textDecorationLine="line-through">${compareAtPrice}</Text>
          ) : null}
        </Box>
      </Box>

      {isSoldOut || isOnSale ? (
        <Box
          position="absolute"
          top={10}
          right={10}
          width={50}
          height={50}
          borderRadius={50}
          backgroundColor={
            isOnSale ? 'saleBadgeBackground' : 'soldOutBadgeBackground'
          }
          alignItems="center"
          justifyContent="center"
        >
          <Text
            variant={isOnSale ? 'body' : 'caption'}
            color="contentInverse"
            textAlign="center"
            allowFontScaling={false}
          >
            {isOnSale ? 'SALE' : 'SOLD OUT'}
          </Text>
        </Box>
      ) : null}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingBottom: '100%',
  },
});
