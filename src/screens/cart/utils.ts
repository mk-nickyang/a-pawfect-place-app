import { PersistedStorage } from '@/modules/storage';

export const CART_ID_STORAGE_KEY = 'cart.id';

export const getCurrentCartId = () =>
  PersistedStorage.getItem(CART_ID_STORAGE_KEY);
