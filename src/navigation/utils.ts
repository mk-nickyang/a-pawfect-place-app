import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import type { RootStackParamList } from './types';

import { SHOP } from '@/config';

const prefix = Linking.createURL('/');

export const DEEP_LINKING: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, SHOP.URL],
  config: {
    screens: {
      HomeTab: {
        initialRouteName: 'Home',
        screens: {
          Product: 'products/:productId',
        },
      },
      ProductsTab: {
        initialRouteName: 'ProductsHome',
        screens: {
          CollectionProducts: 'collections/:collectionHandle',
          Product: 'collections/:collectionHandle/products/:productId',
        },
      },
      CartTab: {
        initialRouteName: 'Cart',
        screens: {
          Cart: 'cart',
        },
      },
    },
  },
};
