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
};

type AccountTabParamList = {
  Account: undefined;
  PersonalDetails: undefined;
  Orders: undefined;
  DeliveryAddress: undefined;
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
  Account: undefined;
  PersonalDetails: undefined;
  Orders: undefined;
  DeliveryAddress: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
