import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { cartQuery } from '../api/cartQuery';

import type { BottomSheetModalRef } from '@/components/BottomSheetModal';

export const useShopifyCheckout = (cart: Cart | undefined) => {
  const isCheckoutSuccessRef = useRef(false);
  const checkoutSuccessModalRef = useRef<BottomSheetModalRef>(null);

  const queryClient = useQueryClient();
  const shopifyCheckout = useShopifyCheckoutSheet();

  useEffect(
    function addCheckoutCloseEventListener() {
      const subscription = shopifyCheckout.addEventListener('close', () => {
        if (isCheckoutSuccessRef.current) {
          setTimeout(() => checkoutSuccessModalRef.current?.present());
          isCheckoutSuccessRef.current = false;
        }
        // Refetch cart when checkout is closed
        if (cart?.id) {
          queryClient.invalidateQueries({
            queryKey: cartQuery(cart.id).queryKey,
          });
        }
      });

      return () => {
        subscription?.remove();
      };
    },
    [cart?.id, queryClient, shopifyCheckout],
  );

  useEffect(
    function addCheckoutCompleteEventListener() {
      const subscription = shopifyCheckout.addEventListener('completed', () => {
        isCheckoutSuccessRef.current = true;
      });

      return () => {
        subscription?.remove();
      };
    },
    [shopifyCheckout],
  );

  const openCheckoutModal = useCallback(() => {
    if (cart?.checkoutUrl) {
      shopifyCheckout.present(cart.checkoutUrl);
    }
  }, [cart?.checkoutUrl, shopifyCheckout]);

  return {
    openCheckoutModal,
    checkoutSuccessModalRef,
  };
};
