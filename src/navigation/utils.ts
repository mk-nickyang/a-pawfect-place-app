import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import type { RootStackParamList } from './types';

const prefix = Linking.createURL('/');

export const DEEP_LINKING: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, 'https://apawfectplace.com.au'],
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
