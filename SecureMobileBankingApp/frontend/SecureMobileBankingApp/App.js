/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useReducer, useMemo} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from './screens/DrawerContent.js';


//import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainTabScreen from './screens/MainTabScreen.js';
import HomeStackScreen from './screens/MainTabScreen.js';
import MyAccountsScreen from './screens/MyAccountsScreen.js';
import MyCardsScreen from './screens/MyCardsScreen.js';
import MyTransactionsScreen from './screens/MyTransactionsScreen.js';
import NotificationsScreen from './screens/NotificationsScreen.js';
import LatestBusinessNewsScreen from './screens/LatestBusinessNewsScreen.js';
import ExchangeRatesScreen from './screens/ExchangeRatesScreen.js';
import Login from './screens/LoginScreen.js';
import LaunchScreen from './screens/LaunchScreen.js'
import MainStackScreen from './screens/MainStackScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureStorage from 'react-native-secure-storage';
import {AuthenticationContext}  from './components/context.js';
import DrawerNavigation from './screens/DrawerNavigation.js'
import SendMoneyScreen from './screens/SendMoneyScreen.js';
import { NotificationListItem } from './components/NotificationListItem.js';

const Drawer = createDrawerNavigator();
const Stack=createStackNavigator();


const App = ({navigation}) =>{

  const initialState = {
    isLoading: true,
    userToken: null,
}
const authenticationReducer = (previousState, action) =>{
  switch(action.type){
    case 'GET_TOKEN':
      return {
        ...previousState,
        userToken: action.token,
        isLoading: false
      };
      case 'LOGIN':
        return{
          ...previousState,
          userToken: action.token,
          isLoading: false
        };
        case 'LOGOUT':
          return{
            ...previousState,
            userToken: null,
            isLoading: false
          };
  }
}
const [state, dispatch] = useReducer(authenticationReducer, initialState);


  const authenticationContext = useMemo(()=>({
    login: async(token) =>{
      try{
        console.log("APP.JS "+token);
        await SecureStorage.setItem('@token',token)
        console.log("SECURE STORAGE"+ token);
      }catch(e){
        console.log(e);
      }
      dispatch({type: 'LOGIN', userToken: token});
    },
    logout: async() =>{
       try{
         await SecureStorage.removeItem('@token');
       }catch(e){
         console.log(e);
       }
       dispatch({type: 'LOGOUT'});
    }
  }))
  const isUserLoggedIn = ()=> setTimeout(async() =>{
     
    let token = null;
    try{
      token = await SecureStorage.getItem('@token');
      if(token){
        dispatch({type: 'GET_TOKEN', userToken: token});
      } else{
       dispatch({type: 'LOGOUT', userToken: token});
      }
    } catch(e){
      console.log(e);
    }
   
  }, 1000)

  useEffect(() =>{
    isUserLoggedIn()
  }, [])
 
  if(state.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large"/>
    </View>
    )
  } 
  return (
  
    <AuthenticationContext.Provider value={authenticationContext}>
     <NavigationContainer>
       {state.userToken !==null ? (
         <Drawer.Navigator 
                  drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen name="MainTabScreen" component={HomeStackScreen}></Drawer.Screen>
                  <Drawer.Screen name="MyAccountsScreen" component={MyAccountsScreen}></Drawer.Screen>
                  <Drawer.Screen name="MyCardsScreen" component={MyCardsScreen}></Drawer.Screen>
                  <Drawer.Screen name="MyTransactionsScreen" component={MyTransactionsScreen}></Drawer.Screen>
                  <Drawer.Screen name="SendMoneyScreen" component={SendMoneyScreen}></Drawer.Screen>
                  <Drawer.Screen name="NotificationsScreen" component={NotificationsScreen}></Drawer.Screen>
                  <Drawer.Screen name="LatestBusinessNewsScreen" component={LatestBusinessNewsScreen}></Drawer.Screen>
                  <Drawer.Screen name="ExchangeRatesScreen" component={ExchangeRatesScreen}></Drawer.Screen>
                </Drawer.Navigator>
               ): 
            <MainStackScreen></MainStackScreen>
       }
            
           
     </NavigationContainer>
     </AuthenticationContext.Provider>
         )   
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
