export type RootStackParamList = {
  // Tabs
  HomeTab: undefined;
  ShopTab: undefined;
  CartTab: undefined;
  AccountTab: undefined;
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
