import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';


//screens
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FormScreen from "../screens/FormScreen";
import CategoryScreen from '../screens/CategoryScreen';
import EventDetailsScreen from "../screens/EventDetailsScreen";


const HomeStackNavigator = createStackNavigator();

function Stack() {
  return (
    <HomeStackNavigator.Navigator  id={undefined as any} initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen  name="HomeScreen" component={HomeScreen}  options={{ headerShown: false }}/>
      <HomeStackNavigator.Screen name="New" component={FormScreen} />
      <HomeStackNavigator.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Eventos por Categoría' }}/>
      <HomeStackNavigator.Screen name="EventDetailsScreen" component={EventDetailsScreen} options={{ title: 'Detalles del Evento' }} />
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
            <Tab.Screen name="Favoritos"
              component={FavoritesScreen}
              options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="star-outline" color={color} size={size} />
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
