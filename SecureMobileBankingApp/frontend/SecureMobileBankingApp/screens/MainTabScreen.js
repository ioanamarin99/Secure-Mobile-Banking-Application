import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{DrawerActions} from '@react-navigation/drawer';

import HomeScreen from './HomeScreen.js';
import ExchangeRatesScreen from './ExchangeRatesScreen.js';
import NotificationsScreen from './NotificationsScreen.js';
import SupportScreen from './LatestBusinessNewsScreen.js';

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreen=({navigation}) => (
    <HomeStack.Navigator screenOptions={{
              headerStyle:{
                backgroundColor:'#1e1e1e'
              },
              headerTintColor: "#fff",
              headrerTitleStyle:{
                fontWeight: 'bold'
              }
            }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
              title: 'Home',
              headerLeft:()=>(
      
                <Icon.Button name="menu-outline" size={30} backgroundColor="#1e1e1e" 
                 onPress={() => navigation.openDrawer()}></Icon.Button> 
              )
            }}/>
          </HomeStack.Navigator> 
    );

      export default HomeStackScreen;