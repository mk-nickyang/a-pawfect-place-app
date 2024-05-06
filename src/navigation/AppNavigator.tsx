import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import type { RootStackParamList } from './types';

import { Icon } from '@/components/Icon';
import { Account } from '@/features/account/screens/Account';
import { DeliveryAddress } from '@/features/account/screens/DeliveryAddress';
import { PersonalDetails } from '@/features/account/screens/PersonalDetails';
import { CartBadge } from '@/features/cart/components/CartBadge';
import { Cart } from '@/features/cart/screens/Cart';
import { Home } from '@/features/home/Home';
import { OrderDetails } from '@/features/orders/screens/OrderDetails';
import { Orders } from '@/features/orders/screens/Orders';
import { CollectionProducts } from '@/features/products/screens/CollectionProducts';
import { Product } from '@/features/products/screens/Product';
import { ProductsHome } from '@/features/products/screens/ProductsHome';
import { SearchProducts } from '@/features/products/screens/SearchProducts';
import theme from '@/theme';

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
    <HomeStack.Navigator>
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
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={Cart} />
    </CartStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator<RootStackParamList>();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
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
    </AccountStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.contentPrimary,
          tabBarInactiveTintColor: theme.colors.contentSecondary,
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
    </NavigationContainer>
  );
};
