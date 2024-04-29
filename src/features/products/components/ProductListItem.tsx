import { useNavigation } from '@react-navigation/native';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme from '@/theme';
import { formatPrice } from '@/utils/currency';

type Props = { product: Product; style?: StyleProp<ViewStyle> };

export const ProductListItem = ({ product, style }: Props) => {
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

  const compareAtPrice = product.compareAtPriceRange.minVariantPrice;
  const currentPrice = product.priceRange.minVariantPrice;

  const isOnSale =
    !!compareAtPrice.amount &&
    Number(compareAtPrice.amount) > Number(currentPrice.amount);

  const hasMultiplePrices =
    product.priceRange.maxVariantPrice.amount !== currentPrice.amount;

  return (
    <PressableOpacity
      onPress={() => navigation.navigate('Product', { productId: product.id })}
      style={[styles.container, style]}
    >
      <View style={styles.imageContainer}>
        <Image source={product.featuredImage?.url} style={styles.image} />
      </View>

      <Box>
        <Text>{product.title}</Text>

        <Box flexDirection="row" pt="xs" gap="s">
          <Text fontWeight="600">
            {hasMultiplePrices ? 'from ' : ''}
            {formatPrice(currentPrice)}
          </Text>
          {isOnSale ? (
            <Text textDecorationLine="line-through">
              {formatPrice(compareAtPrice)}
            </Text>
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
          backgroundColor={isOnSale ? 'badgeBackground' : 'contentPrimary'}
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
    paddingVertical: theme.spacing.s,
  },
  imageContainer: {
    paddingBottom: '100%',
    marginBottom: theme.spacing.s,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },
});
