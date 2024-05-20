import type {
  Product,
  SelectedOption,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useState } from 'react';

import { AddToCartButton } from './AddToCartButton';
import { ProductOptionItem } from './ProductOptionItem';

import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import { useEvent } from '@/hooks/useEvent';
import { formatPrice } from '@/utils/currency';

type Props = { product: Product };

export const ProductForm = ({ product }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.edges[0]?.node,
  );

  const selectedVariantOptions = selectedVariant?.selectedOptions || [];

  const handleProductOptionSelect = useEvent(
    (newSelectedOption: SelectedOption) => {
      if (selectedVariantOptions.length === 1) {
        /**
         * IF there is only one option, we can just look for variant with matching option value.
         */
        const newVariant = product.variants.edges.find(
          (variantEdge) =>
            variantEdge.node.selectedOptions[0]?.value ===
            newSelectedOption.value,
        )?.node;

        if (newVariant) {
          setSelectedVariant(newVariant);
        }
      } else {
        /**
         * IF there are multiple options, we have to look for variant with all matching options.
         * @todo: See if there is a more efficient way to look up
         */
        const newSelectedVariantOptions = selectedVariantOptions.map(
          (option) =>
            option.name === newSelectedOption.name ? newSelectedOption : option,
        );

        const newVariant = product.variants.edges.find((variantEdge) =>
          newSelectedVariantOptions.every((newSelectedOption) =>
            variantEdge.node.selectedOptions.some(
              (option) =>
                option.name === newSelectedOption.name &&
                option.value === newSelectedOption.value,
            ),
          ),
        )?.node;

        if (newVariant) {
          setSelectedVariant(newVariant);
        }
      }
    },
  );

  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;
  const currentPrice = selectedVariant?.price.amount;

  const isOnSale =
    !!compareAtPrice && Number(compareAtPrice) > Number(currentPrice);
  const isSoldOut = !selectedVariant?.availableForSale;

  return (
    <Box mt="s" mb="xl">
      <Box mb="s" flexDirection="row" alignItems="center" g="s">
        <Text variant="h2">{formatPrice(selectedVariant?.price)}</Text>

        {isOnSale ? (
          <Text color="contentSecondary" textDecorationLine="line-through">
            {formatPrice(selectedVariant.compareAtPrice)}
          </Text>
        ) : null}

        {isOnSale || isSoldOut ? (
          <Box
            borderColor={isOnSale ? 'badgeBackground' : 'contentPrimary'}
            borderWidth={1}
            px="s"
            height={24}
            justifyContent="center"
          >
            <Text
              variant="caption"
              fontWeight="600"
              color={isOnSale ? 'badgeBackground' : 'contentPrimary'}
              letterSpacing={1}
            >
              {isOnSale ? 'SALE' : 'SOLD OUT'}
            </Text>
          </Box>
        ) : null}
      </Box>

      {product.variants.edges.length > 1
        ? product.options.map((productOption) => {
            const selectedOption = selectedVariantOptions.find(
              (selectedVariantOption) =>
                selectedVariantOption.name === productOption.name,
            );
            if (!selectedOption) return null;

            return (
              <Box mb="m" key={productOption.id}>
                <Text variant="body1" mb="s">
                  {productOption.name}:
                  <Text variant="h3"> {selectedOption.value}</Text>
                </Text>

                <Box flexDirection="row" flexWrap="wrap" g="s">
                  {productOption.values.map((optionValue) => {
                    return (
                      <ProductOptionItem
                        key={optionValue}
                        name={productOption.name}
                        value={optionValue}
                        checked={selectedOption?.value === optionValue}
                        onChange={handleProductOptionSelect}
                      />
                    );
                  })}
                </Box>
              </Box>
            );
          })
        : null}

      {selectedVariant ? (
        <AddToCartButton
          selectedVariantId={selectedVariant?.id}
          isSoldOut={isSoldOut}
        />
      ) : null}
    </Box>
  );
};
