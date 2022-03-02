import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen.js';
import LaunchScreen from './LaunchScreen.js';

const MainStack=createStackNavigator();

const MainStackScreen=({navigation}) => (
    <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="Launch" component={LaunchScreen}></MainStack.Screen>
        <MainStack.Screen name="Login" component={LoginScreen}></MainStack.Screen>
    </MainStack.Navigator>
);

export default MainStackScreen;