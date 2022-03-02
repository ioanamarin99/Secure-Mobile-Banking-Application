import React, {useEffect,useContext,useState,useRef} from 'react';
import axios from 'axios';
import {Alert,ActivityIndicator} from 'react-native';
import styled from "styled-components"
import Text from '../components/Text.js';
import {API_URI} from '../config/config.js';
import SecureStorage from 'react-native-secure-storage';
import {AuthenticationContext}  from '../components/context.js';
import {Transitioning, Transition} from 'react-native-reanimated';
import { BankAccountsListItem } from '../components/BankAccountsListItem.js';

const MyAccountsScreen= () =>{

  const [mounted, setMounted] = useState(true);
  const [bankAccounts, getBankAccounts] = useState('');
  const [loading, setLoading] = useState(true);
  const {logout} = useContext(AuthenticationContext);
  const transitionRef = useRef();
  const transition = <Transition.Change interpolation="easeInOut"></Transition.Change>
   
  const onPress = () =>{
    transitionRef.current.animateNextTransition();
  }

  useEffect(() => {
    setMounted(true);
      getAllBankAccounts();
      return function cleanup(){ setMounted(false) };
  }, [bankAccounts]);
  
  const getAllBankAccounts = async() =>{
    if(mounted){
    const token = await SecureStorage.getItem("@token");
  
  if(token){
    await axios({
      method: 'GET',
      url: `${API_URI}/api/userBankAccounts`,
      headers: {'Content-Type': 'application/json',
        'auth-token' : token }
    }).then((res) =>{
      const allBankAccounts = res.data;
      getBankAccounts(allBankAccounts);
      setLoading(false);
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
    logout();
    });
}
}}

  const renderBankAccount = ({item}) => (
  
    <BankAccountsListItem item={item} onPress={onPress}></BankAccountsListItem>
    )
    return (
      loading ? (<Container>
         <Text center large heavy margin="20px 0 0 0">My Accounts</Text>
        <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
        </Container>) : (
  <Transitioning.View style={{flex:1, backgroundColor:'#1e1e1e' }} ref={transitionRef} transition={transition}>
      <Text center large heavy margin="20px 0 0 0">My Accounts</Text>
      <AccountList data={bankAccounts} renderItem={renderBankAccount} keyExtractor={(item,index) => index.toString()}></AccountList>
      <StatusBar barStyle="light-content"></StatusBar>
    </Transitioning.View>)
  );
  };


const Container = styled.SafeAreaView`
 flex: 1;
 background-color: #1e1e1e;
 `
const AccountList = styled.FlatList`
  padding: 0 8px;
  margin-top: 32px;
`;

const StatusBar = styled.StatusBar({});

export default MyAccountsScreen;