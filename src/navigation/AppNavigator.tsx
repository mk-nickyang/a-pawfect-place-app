import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Icon } from "@/components/Icon";
import { Account } from "@/screens/account/Account";
import { Home } from "@/screens/home/Home";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();

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
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountTab"
          component={AccountStackNavigator}
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => (
              <Icon name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
