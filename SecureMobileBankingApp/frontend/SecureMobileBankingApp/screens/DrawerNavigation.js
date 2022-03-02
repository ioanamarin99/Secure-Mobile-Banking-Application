import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './DrawerContent.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './MainTabScreen';
import MyAccountsScreen from './MyAccountsScreen.js';
import MyCardsScreen from './MyCardsScreen.js';
import MyTransactionsScreen from './MyTransactionsScreen.js';
import SettingsScreen from './SendMoneyScreen';
import SendMoneyScreen from './SendMoneyScreen';

const Drawer = createDrawerNavigator();
 const DrawerNavigation =({navigation}) =>{

      return(
          <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreen}></Drawer.Screen>
        <Drawer.Screen name="MyAccounts" component={MyAccountsScreen}></Drawer.Screen>
        <Drawer.Screen name="MyCards" component={MyCardsScreen}></Drawer.Screen>
        <Drawer.Screen name="MyTransactions" component={MyTransactionsScreen}></Drawer.Screen>
        <Drawer.Screen name="SendMoney" component={SendMoneyScreen}></Drawer.Screen>
      </Drawer.Navigator>
      </NavigationContainer>
 
  );
};

export default DrawerNavigation;