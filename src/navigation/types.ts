import type { NavigatorScreenParams } from '@react-navigation/native';

type HomeTabParamList = {
  Home: undefined;
};

type ShopTabParamList = {
  Shop: undefined;
  Product: { productId: string };
};

type CartTabParamList = {
  Cart: undefined;
  Checkout: { checkoutUrl: string };
};

type AccountTabParamList = {
  Account: undefined;
};

export type RootStackParamList = {
  // Tabs
  HomeTab: NavigatorScreenParams<HomeTabParamList> | undefined;
  ShopTab: NavigatorScreenParams<ShopTabParamList> | undefined;
  CartTab: NavigatorScreenParams<CartTabParamList> | undefined;
  AccountTab: NavigatorScreenParams<AccountTabParamList> | undefined;
  // Stack screens
  Home: undefined;
  Shop: undefined;
  Product: { productId: string };
  Cart: undefined;
  Checkout: { checkoutUrl: string };
  Account: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
