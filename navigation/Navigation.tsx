import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


//screens
import HomeScreen from "../screens/HomeScreen";
import BuyTicketsScreen from "../screens/BuyTicketsScreen";
import FormScreen from "../screens/FormScreen";
import CategoryScreen from '../screens/CategoryScreen';


const HomeStackNavigator = createStackNavigator();

function Stack() {
  return (
    <HomeStackNavigator.Navigator  id={undefined as any} initialRouteName="Home">
      <HomeStackNavigator.Screen  name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
      <HomeStackNavigator.Screen name="New" component={FormScreen} />
      <HomeStackNavigator.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Eventos por Categoría' }}/>
    </HomeStackNavigator.Navigator>
  );
}
 

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
      
       <Tab.Navigator id={undefined as any}
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
              component={Stack}
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
