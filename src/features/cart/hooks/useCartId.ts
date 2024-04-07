import { useMMKVString } from 'react-native-mmkv';

const CART_ID_STORAGE_KEY = 'cart.id';

export const useCartId = () => {
  const [cartId, setCartId] = useMMKVString(CART_ID_STORAGE_KEY);
  return { cartId, setCartId };
};
