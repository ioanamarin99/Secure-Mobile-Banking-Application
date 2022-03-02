import React, {createContext, useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_URI}from '../config/config.js';
import { Alert } from 'react-native';
import {AuthenticationContext} from '../components/context.js';

const LoginScreen= (props) =>{
   
    const [data, setData] = useState({
          userID: '',
          password: '',
          textInputChangeCheck: false,
          secureTextEntry: true
    });
const {login} = useContext(AuthenticationContext);
const textInputChange= (value) =>{
    if(value.length !=0){
        setData({...data, userID:value, textInputChangeCheck: true});
    } else {
        setData({...data, userID:value, textInputChangeCheck: false});
    }
}
const passwordInputChange= (value) =>{
    if(value.length !=0){
        setData({...data, password:value, textInputChangeCheck: true});
    } else {
        setData({...data, password:value, textInputChangeCheck: false});
    }
}


const loginHandler = async (props) =>{
    console.log(data.userID);
    if(data.userID.length != 0 && data.password.length != 0){
    const credentials = JSON.stringify({"UserLoginID": data.userID, "UserPassword": data.password});
  
    await axios({
        method: 'POST',
        url: `${API_URI}/api/userAccount/login`,
        data: credentials,
        headers: {'Content-Type': 'application/json' }
    }).then((res) =>{ 
        const token = res.data;
        console.log(res.data);
        login(token);
    
    }).catch( (e) =>{ console.log(e.response.data.message);
    Alert.alert(e.response.data.message); 
});
    }else{
        Alert.alert("Please make sure all fields are filled in correctly!");
    }
};


    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>  
      </View>
 
 
      <Animatable.View style={styles.footer}  animation="fadeInRight"> 
         <Text style={styles.text_footer}>Login ID</Text>
         <View style={styles.action}>
            
            <Icon name="person-outline" size={20}></Icon>
   
            <TextInput placeholder="Your #secure login ID" style={styles.textInput} value={data.userID} onChangeText={(val) => textInputChange(val)}></TextInput>
            </View>

            <Text style={[styles.text_footer , {marginTop:35}]}>Password</Text>
         <View style={styles.action}>
            <Icon name="lock-closed-outline" size={20}></Icon>
            <TextInput placeholder="Your #secure password" style={styles.textInput} value={data.password} onChangeText={(val) => passwordInputChange(val)} secureTextEntry={true}></TextInput>
         </View>
         <View style={styles.button}>
         <TouchableOpacity onPress={() => {loginHandler(props)}} style={[styles.signIn]}>
             <LinearGradient colors={['#360033', '#0b8793']} style={styles.signIn}>
                 <Text style={styles.textSign}>Login</Text>
             </LinearGradient>
             </TouchableOpacity>

         </View>
      </Animatable.View>
      </View>
   
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1e1e1e'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
  });

export default LoginScreen;