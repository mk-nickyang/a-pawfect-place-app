export type RootStackParamList = {
  Home: undefined;
  Shop: undefined;
  Product: { productId: string };
  Cart: undefined;
  Account: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
