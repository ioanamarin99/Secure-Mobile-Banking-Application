import React, {useEffect,useRef,useState} from 'react';
import {View, StyleSheet,ActivityIndicator} from 'react-native';
import styled from "styled-components"
import Text from '../components/Text.js';
import firebase from 'firebase'
import { LogBox } from 'react-native';
import {Transitioning, Transition} from 'react-native-reanimated';
import {NotificationListItem} from '../components/NotificationListItem.js'
import {FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID} from '../config/config.js'
LogBox.ignoreLogs(['Setting a timer']);
const NotificationsScreen = () =>{

  const [notifications,getNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const transitionRef = useRef();
  const transition = <Transition.Change interpolation="easeInOut"></Transition.Change>

  const onPress = () =>{
    transitionRef.current.animateNextTransition();
  }

  useEffect(() => {
    getAllNotifications();
}, []);

const getAllNotifications = async() =>{
  var firebaseConfig = {
          apiKey: FIREBASE_API_KEY,
          authDomain: AUTH_DOMAIN,
          projectId: PROJECT_ID,
          storageBucket: STORAGE_BUCKET,
          messagingSenderId: MEASUREMENT_ID,
          appId: APP_ID,
          measurementId: MEASUREMENT_ID
        };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        firebase.database().ref('notifications').once('value', (snapshot) =>{
                 const items = [];
                 snapshot.forEach((item) =>{
                   items.push({
                     title : item.val().title,
                     date: item.val().date,
                     time: item.val().time,
                     category: item.val().category,
                     text: item.val().text
                   });
                 }); 
                 getNotifications(items);
                 setLoading(false);
               })
}
const renderNotification = ({item}) =>(
  <NotificationListItem item={item} onPress={onPress}/>
  
    )   
          return(
            <Transitioning.View style={{flex:1, backgroundColor:'#1e1e1e' }} ref={transitionRef} transition={transition}>
                     <Text center large heavy margin="20px 0 0 0">My Notifications</Text>
                     {loading ? ( <ActivityIndicator size="large" color="#fff"></ActivityIndicator>) :
                     (<NotificationList data={notifications} renderItem={renderNotification} keyExtractor={(item,index) => index.toString()}></NotificationList>)
                     }        
            </Transitioning.View> 
          )}     


 
 const NotificationList = styled.FlatList`
 padding: 0 8px;
 margin-top: 32px;
`;


export default NotificationsScreen;

 //  firebase.database().ref('notifications/01').set(
//     //    {
//     //      title: 'Notification 1',
//     //      date: '12/02/2021',
//     //      time: '12:56',
//     //      category: 'Informations about application',
//     //      text: 'Hello, this is a notification'
//     //    }).then(() =>{
//     //      console.log('INSERTED');
//     //    }).catch((e) =>{
//     //      console.log(e);
//     //    });