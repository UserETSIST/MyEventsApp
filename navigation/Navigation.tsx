import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";



//screens
import HomeScreen from "../screens/HomeScreen";
import BuyTicketsScreen from "../screens/BuyTicketsScreen";
import FormScreen from "../screens/FormScreen";
import CategoryScreen from '../screens/CategoryScreen';


const HomeStackNavigator = createNativeStackNavigator();

function Stack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="Home">
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen name="New" component={FormScreen} />
      <HomeStackNavigator.Screen name="Category" component={CategoryScreen} options={{ title: 'Eventos por Categoría' }}/>
    </HomeStackNavigator.Navigator>
  );
}
 

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
      
       <Tab.Navigator 
       screenOptions={{
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f5f5f5', 
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'purple', 
        },
      }}
       >
            <Tab.Screen  name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            ),
          }} />
            <Tab.Screen name="Nuevo"
              component={FormScreen}
              options={{
                tabBarLabel: 'Nuevo',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
            ),
          }}/>
            <Tab.Screen name="Comprar"
              component={BuyTicketsScreen}
              options={{
                tabBarLabel: 'Comprar',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="ticket-outline" color={color} size={size} />
            ),
          }}/>
       </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}
