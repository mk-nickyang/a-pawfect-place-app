import { useNavigation } from '@react-navigation/native';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { Image } from 'expo-image';
import { View, StyleSheet, Pressable } from 'react-native';

import { Text } from '@/components/Text';

type Props = { product: Product };

export const CollectionProduct = ({ product }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Product', { productId: product.id })}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.featuredImage.url}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <Text variant="body">{product.title}</Text>
      <Text variant="body">${product.priceRange.minVariantPrice.amount}</Text>
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
