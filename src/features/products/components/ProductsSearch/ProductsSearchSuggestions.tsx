import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { useSearchSuggestions } from '../../api/useSearchSuggestions';
import { useSearchQuery } from '../../store/productsSearch';

import { Box } from '@/components/Box';
import { Loading } from '@/components/Loading';
import { PressableOpacity } from '@/components/PressableOpacity';
import { Text } from '@/components/Text';

export const ProductsSearchSuggestions = memo(() => {
  const navigation = useNavigation();

  const searchQuery = useSearchQuery();

  const { data: suggestedProducts, isLoading } =
    useSearchSuggestions(searchQuery);

  if (isLoading) return <Loading height="100%" />;

  if (!suggestedProducts?.length) return <Text>No results found.</Text>;

  return suggestedProducts.map((suggestedProduct) => (
    <PressableOpacity
      key={suggestedProduct.id}
      onPress={() =>
        navigation.navigate('Product', {
          productId: suggestedProduct.id,
          productTitle: suggestedProduct.title,
        })
      }
    >
      <Box
        py="m"
        borderBottomColor="borderPrimary"
        borderBottomWidth={StyleSheet.hairlineWidth}
      >
        <Text>{suggestedProduct.title}</Text>
      </Box>
    </PressableOpacity>
  ));
});

ProductsSearchSuggestions.displayName = 'ProductsSearchSuggestions';
