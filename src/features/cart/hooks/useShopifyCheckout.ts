import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';
import type { Cart } from '@shopify/hydrogen-react/storefront-api-types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { cartQuery } from '../api/cartQuery';

import type { ModalRef } from '@/components/Modal';
import { Haptics } from '@/modules/haptics';

export const useShopifyCheckout = (cart: Cart | undefined) => {
  const checkoutSuccessModalRef = useRef<ModalRef>(null);

  const queryClient = useQueryClient();
  const shopifyCheckout = useShopifyCheckoutSheet();

  /**
   * Preload checkout page for faster loading
   * @see https://github.com/Shopify/checkout-sheet-kit-react-native?tab=readme-ov-file#preloading
   */
  useEffect(
    function preloadCheckoutPage() {
      if (cart?.checkoutUrl) {
        shopifyCheckout.preload(cart.checkoutUrl);
      }
    },
    [cart?.checkoutUrl, shopifyCheckout],
  );

  useEffect(
    function addCheckoutCloseEventListener() {
      const subscription = shopifyCheckout.addEventListener('close', () => {
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
        Haptics.impact();
        checkoutSuccessModalRef.current?.present();
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
