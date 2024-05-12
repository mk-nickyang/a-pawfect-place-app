import { useNavigation } from '@react-navigation/native';
import type { ProductEdge } from '@shopify/hydrogen-react/storefront-api-types';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { ProductListItem } from '@/features/products/components/ProductList/ProductListItem';
import theme from '@/theme';

type Props = {
  title: string;
  collectionHandle: string;
  products: ProductEdge[];
};

export const HomeCollectionSection = memo(
  ({ title, collectionHandle, products }: Props) => {
    const navigation = useNavigation();

    const onActionButtonPress = () => {
      switch (collectionHandle) {
        case 'app-top-picks':
          navigation.navigate('ProductsTab', {
            screen: 'CollectionProducts',
            params: { collectionHandle: 'all', collectionTitle: 'Shop All' },
            initial: false,
          });
          break;
        case 'app-new-arrivals':
          navigation.navigate('ProductsTab', {
            screen: 'CollectionProducts',
            params: {
              collectionHandle: 'new-arrivals',
              collectionTitle: 'New Arrivals',
            },
            initial: false,
          });
          break;
        default:
          navigation.navigate('ProductsTab', {
            screen: 'CollectionProducts',
            params: { collectionHandle, collectionTitle: title },
            initial: false,
          });
          break;
      }
    };

    return (
      <Box pb="xl">
        <Box p="m">
          <Text variant="h2">{title}</Text>
        </Box>

        <Box flexDirection="row" flexWrap="wrap">
          {products.map((product, index) => (
            <ProductListItem
              key={product.node.id}
              product={product.node}
              badgeRightOffset={index % 2 === 0 ? 12 : 20}
              style={
                index % 2 === 0 ? styles.leftListItem : styles.rightListItem
              }
            />
          ))}
        </Box>

        <Box alignItems="center">
          <Button
            label="VIEW MORE"
            onPress={onActionButtonPress}
            style={styles.actionButton}
          />
        </Box>
      </Box>
    );
  },
);

HomeCollectionSection.displayName = 'HomeCollectionSection';

const styles = StyleSheet.create({
  leftListItem: {
    width: '50%',
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.s,
    paddingBottom: theme.spacing.m,
  },
  rightListItem: {
    width: '50%',
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.m,
    paddingBottom: theme.spacing.m,
  },
  actionButton: {
    width: '100%',
    maxWidth: 240,
  },
});
