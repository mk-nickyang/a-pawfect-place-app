import { useMMKVString } from 'react-native-mmkv';

import { CART_ID_STORAGE_KEY } from './utils';

export const useCartId = () => {
  const [cartId] = useMMKVString(CART_ID_STORAGE_KEY);
  return cartId;
};
