import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = { product: Product };

export const CollectionProduct = ({ product }: Props) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={product.featuredImage.url}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
      </View>
      <Text>{product.title}</Text>
      <Text>${product.priceRange.minVariantPrice.amount}</Text>
    </Pressable>
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
