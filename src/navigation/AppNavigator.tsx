import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import type { RootStackParamList } from './types';

import { Icon } from '@/components/Icon';
import { useThemeMode } from '@/context/ThemeContext';
import { Account } from '@/features/account/screens/Account';
import { Appearance } from '@/features/account/screens/Appearance';
import { ContactUs } from '@/features/account/screens/ContactUs';
import { DeliveryAddress } from '@/features/account/screens/DeliveryAddress';
import { Legal } from '@/features/account/screens/Legal';
import { PersonalDetails } from '@/features/account/screens/PersonalDetails';
import { ReturnPolicy } from '@/features/account/screens/ReturnPolicy';
import { ShippingPolicy } from '@/features/account/screens/ShippingPolicy';
import { CartBadge } from '@/features/cart/components/CartBadge';
import { Cart } from '@/features/cart/screens/Cart';
import { Home } from '@/features/home/Home';
import { OrderDetails } from '@/features/orders/screens/OrderDetails';
import { Orders } from '@/features/orders/screens/Orders';
import { CollectionProducts } from '@/features/products/screens/CollectionProducts';
import { Product } from '@/features/products/screens/Product';
import { ProductsHome } from '@/features/products/screens/ProductsHome';
import { SearchProducts } from '@/features/products/screens/SearchProducts';
import { useTheme } from '@/theme';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const commonScreens = (Stack: typeof HomeStack) => {
  return (
    <Stack.Screen
      name="Product"
      component={Product}
      options={({ route }) => ({ title: route.params.productTitle })}
    />
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: false,
        headerBackTitleVisible: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {commonScreens(HomeStack)}
    </HomeStack.Navigator>
  );
};

const ProductsStack = createNativeStackNavigator<RootStackParamList>();

const ProductsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: false,
        headerBackTitleVisible: false,
      }}
    >
      <ProductsStack.Screen
        name="ProductsHome"
        component={ProductsHome}
        options={{ headerShown: false }}
      />
      <ProductsStack.Screen
        name="CollectionProducts"
        component={CollectionProducts}
        options={({ route }) => ({ title: route.params.collectionTitle })}
      />
      <ProductsStack.Screen
        name="SearchProducts"
        component={SearchProducts}
        options={({ route }) => ({
          title: route.params.searchQuery
            ? `Results for '${route.params.searchQuery}'`
            : '',
        })}
      />
      {commonScreens(ProductsStack)}
    </ProductsStack.Navigator>
  );
};

const CartStack = createNativeStackNavigator<RootStackParamList>();

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator screenOptions={{ headerBackButtonMenuEnabled: false }}>
      <CartStack.Screen name="Cart" component={Cart} />
      {commonScreens(CartStack)}
    </CartStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator<RootStackParamList>();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false }}
    >
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{ title: 'Personal Details' }}
      />
      <AccountStack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{ title: 'Delivery Address' }}
      />
      <AccountStack.Screen name="Orders" component={Orders} />
      <AccountStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ title: '' }}
      />
      <AccountStack.Screen
        name="ShippingPolicy"
        component={ShippingPolicy}
        options={{ title: 'Shipping Policy' }}
      />
      <AccountStack.Screen
        name="ReturnPolicy"
        component={ReturnPolicy}
        options={{ title: 'Return Policy' }}
      />
      <AccountStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: 'Contact Us' }}
      />
      <AccountStack.Screen
        name="Legal"
        component={Legal}
        options={({ route }) => ({ title: route.params.title })}
      />
      <AccountStack.Screen name="Appearance" component={Appearance} />
      {commonScreens(AccountStack)}
    </AccountStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const ThemedNavigationContainer = ({ children }: PropsWithChildren) => {
  const themeMode = useThemeMode();

  return (
    <NavigationContainer
      theme={themeMode === 'dark' ? DarkTheme : DefaultTheme}
    >
      {children}
    </NavigationContainer>
  );
};

export const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <ThemedNavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.contentPrimary,
          tabBarInactiveTintColor: colors.contentSecondary,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProductsTab"
          component={ProductsStackNavigator}
          options={{
            title: 'Products',
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CartTab"
          component={CartStackNavigator}
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <View>
                <Icon name="cart" color={color} size={size} />
                <CartBadge />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AccountTab"
          component={AccountStackNavigator}
          options={{
            title: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </ThemedNavigationContainer>
  );
};
