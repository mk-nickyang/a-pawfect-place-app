import type { NavigatorScreenParams } from '@react-navigation/native';

type HomeTabParamList = {
  Home: undefined;
};

type ProductsTabParamList = {
  Products: undefined;
  Product: { productId: string };
};

type CartTabParamList = {
  Cart: undefined;
};

type AccountTabParamList = {
  Account: undefined;
  PersonalDetails: undefined;
  DeliveryAddress: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
};

export type RootStackParamList = {
  // Tabs
  HomeTab: NavigatorScreenParams<HomeTabParamList> | undefined;
  ProductsTab: NavigatorScreenParams<ProductsTabParamList> | undefined;
  CartTab: NavigatorScreenParams<CartTabParamList> | undefined;
  AccountTab: NavigatorScreenParams<AccountTabParamList> | undefined;
  // Stack screens
  Home: undefined;
  Products: undefined;
  Product: { productId: string };
  Cart: undefined;
  Account: undefined;
  PersonalDetails: undefined;
  DeliveryAddress: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
