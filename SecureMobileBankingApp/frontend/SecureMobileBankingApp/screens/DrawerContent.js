import React,{useContext,useEffect,useState} from 'react';
import {View, StyleSheet,Alert,Ima} from 'react-native';
import{DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import{Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components";
import Text from '../components/Text.js';
import {API_URI} from '../config/config.js';
import SecureStorage from 'react-native-secure-storage';
import {AuthenticationContext}  from '../components/context.js';



export function  DrawerContent(props){

  const {logout} = useContext(AuthenticationContext);

  const [userInfo, getUserInfo] = useState([]);

useEffect(()=>{
  getUser();
},[]);

const getUser = async() =>{
  const token = await SecureStorage.getItem("@token");
if(token){
  await axios({
    method: 'GET',
    url: `${API_URI}/api/userAccount`,
    headers: {'Content-Type': 'application/json',
       'auth-token' : token }
  }).then((res) =>{
    const userData = res.data;
     getUserInfo(userData);
  }).catch((e) =>{ console.log(e.response.data.message)
    Alert.alert("You have been logged out! " + e.response.data.message);
    logout();
  });  
}
}

    return(
       <View style={{flex:1, backgroundColor: "#1e1e1e"}}>
         <DrawerContentScrollView {...props}>
             <View style={styles.drawerContent}>
               <View style={styles.userSection}> 
                   <View style={{ marginTop: 15,flexDirection: 'row'}}>
                       <Avatar.Image source={require("../res/user-logo.png")}
                      size={50}>
                      </Avatar.Image>
                   </View>
               </View>
               <View style={{marginLeft:15, flexDirection: 'column'}}>
               <Text style={styles.title}>{userInfo.UserName}</Text>
               <Text></Text>
               <Text style={styles.caption}>@username: {userInfo.UserLoginID}</Text>
               </View>
             </View>

             <Drawer.Section style={styles.drawerSection}>
             <DrawerItem icon={({size})=> (
                 <Icon name="home-outline" color={"white"} size={size}/> )}
             label="Home" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("Home")}}></DrawerItem>

             <DrawerItem icon={({size})=> (
                 <Icon name="server-outline" color={"white"} size={size}/> )}
             label="My accounts" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("MyAccountsScreen")}}></DrawerItem>

             
            <DrawerItem icon={({size})=> (
                 <Icon name="card-outline" color={"white"} size={size}/> )}
             label="My cards" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("MyCardsScreen")}}></DrawerItem>

            <DrawerItem icon={({size})=> (
                 <Icon name="swap-horizontal-outline" color={"white"} size={size}/> )}
             label="My transactions" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("MyTransactionsScreen")}}></DrawerItem>
          
          <DrawerItem icon={({size})=> (
                 <Icon name="send-outline" color={"white"} size={size}/> )}
             label="Send money" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("SendMoneyScreen")}}></DrawerItem>

          <DrawerItem icon={({size})=> (
                 <Icon name="notifications-outline" color={"white"} size={size}/> )}
             label="Notifications" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("NotificationsScreen")}}></DrawerItem>
          
          <DrawerItem icon={({size})=> (
                 <Icon name="newspaper-outline" color={"white"} size={size}/> )}
             label="Latest business news" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("LatestBusinessNewsScreen")}}></DrawerItem>

          <DrawerItem icon={({size})=> (
                 <Icon name="logo-euro" color={"white"} size={size}/> )}
             label="Exchange rates" labelStyle={{color: "white"}} onPress={()=>{props.navigation.navigate("ExchangeRatesScreen")}}></DrawerItem>
            </Drawer.Section>
         </DrawerContentScrollView>
         
         <Drawer.Section style={styles.bottomSection}>
             <DrawerItem icon={({size})=> (
                 <Icon name="log-out-outline" color={"white"} size={size}/>  )}
             label="Sign out" labelStyle={{color: "white"}} onPress={()=>{logout()}}></DrawerItem>
         </Drawer.Section>
       </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomSection: {
        marginBottom: 15,
        borderTopColor: '#1e1e1e',
        borderTopWidth: 1,
        backgroundColor: "#1e1e1e"
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
