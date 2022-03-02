import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions,TouchableOpacity,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from'react-native-vector-icons/Ionicons';
import styled from "styled-components";


const LaunchScreen= ({navigation}) =>{
   
    return (
      <View style={styles.container}>
        <View style={styles.header}>
           <Animatable.Image animation="slideInDown" source={require('../res/secure-logo.png')}></Animatable.Image>
        </View>

        <Animatable.View style={styles.footer} animation="slideInLeft">
            <Text style={styles.title}>Keep your money safe and your data secured!</Text>
            <View>
            <SendButton  onPress={() =>navigation.navigate("Login")} style={[styles.signIn]}>
            <LinearGradient colors={['#360033', '#0b8793']} style={[styles.signIn, {marginTop:10}]}>
                    <Text style={styles.textSign}>Go!</Text>
                    </LinearGradient>
            </SendButton>
            </View>
        </Animatable.View>
      </View>

    );
  };


const height_logo= 0.3* Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1e1e1e'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        alignItems : 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

const SendButton = styled.TouchableOpacity`
margin: 16px;
padding: 16px 32px;
align-items: center;
border-radius: 12px;
`

export default LaunchScreen;