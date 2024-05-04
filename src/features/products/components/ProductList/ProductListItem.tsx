import { useNavigation } from '@react-navigation/native';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { RecentlyViewedProductsStorage } from '../../modules/recentlyViewedProducts';

import { Box } from '@/components/Box';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';
import theme from '@/theme';
import { formatPrice } from '@/utils/currency';

type Props = {
  product: Product;
  badgeTopOffset?: number;
  badgeRightOffset?: number;
  style?: StyleProp<ViewStyle>;
};

export const ProductListItem = memo(
  ({ product, badgeTopOffset = 4, badgeRightOffset = 4, style }: Props) => {
    const navigation = useNavigation();

    const onItemPress = () => {
      navigation.navigate('Product', {
        productId: product.id,
        productTitle: product.title,
      });
      // Wrapping with `setTimeout` since we don't want it to block the main JS thread when loading product screen
      setTimeout(() => RecentlyViewedProductsStorage.add(product));
    };

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
      <PressableOpacity onPress={onItemPress} style={style}>
        <View style={styles.imageContainer}>
          <Image source={product.featuredImage?.url} style={styles.image} />
        </View>

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

        {isSoldOut || isOnSale ? (
          <Box
            position="absolute"
            top={badgeTopOffset}
            right={badgeRightOffset}
            width={50}
            height={50}
            borderRadius={50}
            backgroundColor={isOnSale ? 'badgeBackground' : 'contentPrimary'}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              variant={isOnSale ? 'body2' : 'caption'}
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
  },
);

ProductListItem.displayName = 'ProductListItem';

const styles = StyleSheet.create({
  imageContainer: {
    paddingBottom: '100%',
    marginBottom: theme.spacing.s,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },
});
