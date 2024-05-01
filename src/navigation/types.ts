import type { NavigatorScreenParams } from '@react-navigation/native';

type HomeTabParamList = {
  Home: undefined;
};

type ProductsTabParamList = {
  ProductsHome: undefined;
  CollectionProducts: { collectionHandle: string; collectionTitle: string };
  SearchProducts: { searchQuery: string };
  Product: { productId: string; productTitle?: string };
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
  HomeTab: NavigatorScreenParams<HomeTabParamList> | undefined;
  ProductsTab: NavigatorScreenParams<ProductsTabParamList> | undefined;
  CartTab: NavigatorScreenParams<CartTabParamList> | undefined;
  AccountTab: NavigatorScreenParams<AccountTabParamList> | undefined;
} & HomeTabParamList &
  ProductsTabParamList &
  CartTabParamList &
  AccountTabParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
