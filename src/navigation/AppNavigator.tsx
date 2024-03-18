import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import type { RootStackParamList } from './types';

import { Icon } from '@/components/Icon';
import { Account } from '@/screens/account/Account';
import { Cart } from '@/screens/cart/Cart';
import { CartBadge } from '@/screens/cart/components/CartBadge';
import { Checkout } from '@/screens/checkout/Checkout';
import { Home } from '@/screens/home/Home';
import { Product } from '@/screens/product/Product';
import { Shop } from '@/screens/shop/Shop';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const ShopStack = createNativeStackNavigator<RootStackParamList>();

const ShopStackNavigator = () => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="Shop" component={Shop} />
      <ShopStack.Screen
        name="Product"
        component={Product}
        options={{ title: '' }}
      />
    </ShopStack.Navigator>
  );
};

const CartStack = createNativeStackNavigator<RootStackParamList>();

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Checkout" component={Checkout} />
    </CartStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator<RootStackParamList>();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={Account} />
    </AccountStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
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
          name="ShopTab"
          component={ShopStackNavigator}
          options={{
            title: 'Shop',
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
