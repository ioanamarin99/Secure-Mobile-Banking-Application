import React, {useEffect,useState,useContext} from 'react';
import {View, StyleSheet, Alert,ActivityIndicator} from 'react-native';
import styled from "styled-components"
import Text from '../components/Text.js';
import {API_URI} from '../config/config.js';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import axios from 'axios';
import {AuthenticationContext}  from '../components/context.js';

const HomeScreen = ({navigation}) =>{

  const [mounted,setMounted] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [receiptsDate, setReceiptsDate] = useState([]);
  const [loading, setLoading] = useState(true);

  const {logout} = useContext(AuthenticationContext);
  
  useEffect(()=>{
    setMounted(true);
    getBankAccountData(), getReceipts();
    return function cleanup() { setMounted(false) };
  },[receipts]);

  const getBankAccountData = async() =>{
    if(mounted){
    const token = await SecureStorage.getItem("@token");
  if(token){
    await axios({
      method: 'GET',
      url: `${API_URI}/api/userBankAccounts`,
      headers: {'Content-Type': 'application/json',
         'auth-token' : token }
    }).then((res) =>{
      const bankAccountData = res.data;
     for(var account of bankAccountData){
      if(account.AccountTypeID == 1){
           setAvailableBalance(account.AvailableBalance);
      }
    }
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
      logout();
    });  
  }
}
  }
  const getReceipts = async() =>{
    if(mounted){
    const token = await SecureStorage.getItem("@token");
  if(token){
    await axios({
      method: 'GET',
      url: `${API_URI}/api/receipts`,
      headers: {'Content-Type': 'application/json',
         'auth-token' : token }
    }).then((res) =>{
      const values = res.data;
      var amounts = [], dates = [],i=0;
      for(var receipt of values){
           amounts[i] = Number(receipt.Receipts);
           dates[i] = receipt.TransactionDate.toString().substring(5,10);
           i++;
      }
      setReceipts(amounts);
      setReceiptsDate(dates);
      setLoading(false);
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
    logout();
  });
 }
}
  }
    return (
      loading ?  ( <Container>
        <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
        </Container>) : (
   <Container>
      <Text center title black value = {availableBalance} onChange={(val) => setAvailableBalance(val)}>{Number(availableBalance).toFixed(2)} RON</Text>
      <Text center heavy color="#727479">Available balance</Text>
      <Text></Text>
        <Text></Text>
      <View >
   
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center'}}>
        
      <View>
  <LineChart
    data={{
      labels: receiptsDate,
      datasets: [
        {
          data: receipts
        }
      ]
    }}
    width={Dimensions.get("window").width} 
    height={259}
    yAxisInterval={1} 
    chartConfig={{
      backgroundGradientFrom: "#1e1e1e",
      backgroundGradientTo: "#1e1e1e",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth : 3
    }}
    withVerticalLines = {true}
    withHorizontalLines = {true}
    bezier

  />
</View>
      </View>
    </View>
    
       <Button onPress={() => navigation.navigate('SendMoneyScreen')}>
                 <Text medium heavy>Send money!</Text>
            </Button>

            <Button onPress={() => navigation.navigate('MyAccountsScreen')}>
                 <Text medium heavy>Let's see your bank accounts!</Text>
            </Button>

            <Button onPress={() => navigation.navigate('MyCardsScreen')}>
                 <Text medium heavy>Let's see your cards!</Text>
            </Button>

   </Container>)
    );
  };


  const styles= StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }
  });

const Container = styled.ScrollView`
flex: 1;
background-color: #1e1e1e;
`
const Button = styled.TouchableOpacity`
margin: 16px;
background-color: #5196f4;
padding: 16px 32px;
align-items: center;
border-radius: 12px;
`
  export default HomeScreen;