import type { NavigatorScreenParams } from '@react-navigation/native';

type CommonScreens = { Product: { productId: string; productTitle?: string } };

type HomeTabParamList = {
  Home: undefined;
} & CommonScreens;

type ProductsTabParamList = {
  ProductsHome: undefined;
  CollectionProducts: { collectionHandle: string; collectionTitle: string };
  SearchProducts: { searchQuery: string };
} & CommonScreens;

type CartTabParamList = {
  Cart: undefined;
} & CommonScreens;

type AccountTabParamList = {
  Account: undefined;
  PersonalDetails: undefined;
  DeliveryAddress: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
  ShippingPolicy: undefined;
  ReturnPolicy: undefined;
  ContactUs: undefined;
  Legal: { title: string; html?: string };
  Appearance: undefined;
} & CommonScreens;

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
