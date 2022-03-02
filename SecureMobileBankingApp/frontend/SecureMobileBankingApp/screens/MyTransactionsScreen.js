import React, {useEffect,useContext,useState,useMemo} from 'react';
import {Alert,ActivityIndicator} from 'react-native';
import styled from "styled-components"
import Text from '../components/Text.js';
import {API_URI} from '../config/config.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import {AuthenticationContext}  from '../components/context.js';

const MyTransactionsScreen= () =>{

  const {logout} = useContext(AuthenticationContext);
  const [mounted, setMounted] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [updatedTransactions, setUpdatedTransactions] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(()=>{
    setMounted(true);
      getAllTransactions(), getBankAccountData();
      return function cleanup() { setMounted(false) };
  },[transactions]);

  const getAllTransactions = async() =>{
if(mounted)
{
    const token = await SecureStorage.getItem("@token");
  if(token){
    await axios({
      method: 'GET',
      url: `${API_URI}/api/userTransactions`,
      headers: {'Content-Type': 'application/json',
         'auth-token' : token }
    }).then((res) =>{
      const allTransactions = res.data;
      setTransactions(allTransactions);
      if(JSON.stringify(transactions)!==JSON.stringify(updatedTransactions)){
        setUpdatedTransactions(allTransactions);
        setResults(allTransactions);
      } 
      setLoading(false);
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
    logout();
  });
 }
}
  }

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
 
  const searchTransaction = (name) =>{
    let data = updatedTransactions;
    if(!name || name===''){
      setResults(data);
    } else{
    let foundTransactions = data.filter((item) => (item.BeneficiaryOrRemitter).toLowerCase().includes(name));
  
    setResults(foundTransactions);}
  }


  const renderTransaction = ({item}) => (
    <TransactionContainer>
      <TransactionDetails>
        {item.TransactionTypeID == 1 ? 
        (<Text heavy>Transfer</Text>) :
        item.TransactionTypeID == 2 ?
        (<Text heavy>Online payment</Text>) :
        item.TransactionTypeID == 3 ? 
        (<Text heavy>Bill payment</Text>) :
        (<Text heavy>Charge</Text>)
      }
      {
        item.Amount < 0 ? (<Text  bold margin = "2px 0 2px 0">To : {item.BeneficiaryOrRemitter}</Text>) :
        (<Text  bold margin = "2px 0 2px 0">From : {item.BeneficiaryOrRemitter}</Text>)
      }
      <Text small color="#727479">Associated account number: {item.AssociatedIAccountNumber}</Text>
      <Text  small color = "#727479">{item.Description}</Text>
      <Text small color = "#727479">Transaction date: {item.TransactionDate}</Text>
      <Text small color = "#727479">Value date: {item.ValueDate}</Text>
      </TransactionDetails>
      <Text heavy>{item.Amount} RON</Text>
    </TransactionContainer>                               
  )

    return (
      loading ? (<Container>
         <Text center large heavy margin="20px 0 0 0">My Transactions</Text>
         <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
      </Container>) :
      (<Container>
      <Text center large heavy margin="20px 0 0 0">My Transactions</Text>
      <Text></Text>
      <Text center title black value = {availableBalance} onChangeText={(val) => setAvailableBalance(val)}>{Number(availableBalance).toFixed(2)} RON</Text>
      <Text center heavy color="#727479">Available balance</Text>

      <TransactionList ListHeaderComponent={
        <>
        <TransactionHeader>
        </TransactionHeader>

        <SearchContainer>
          <Icon name="search-outline" size={18} color="#5196f4"></Icon>

      
          <Search placeholder="Search" onChangeText={(val) => searchTransaction(val)} ></Search>
        </SearchContainer>
        </>
      }
  
    data={results} renderItem = {renderTransaction} keyExtractor={(item,index) => index.toString()}  
      ></TransactionList>
    </Container>)
    );
  };


const Container = styled.SafeAreaView`
flex: 1;
background-color: #1e1e1e;
`
const StatusBar = styled.StatusBar({});

const TransactionList = styled.FlatList`
  padding: 0 8px;
  margin-top: 32px;
  background-color: #292929;
`;

const TransactionHeader = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between`;

const SearchContainer = styled.View`
flex-direction: row;
align-items: center;
background-color: #3d3d3d;
padding: 0 8px;
border-radius: 6px;
margin: 16px 0;`

const Search = styled.TextInput`
flex: 1;
padding: 8px 16px;
font-family: "Avenir";
color: #dbdbdb`;

const TransactionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #393939;
  padding-bottom: 12px;
  margin-bottom: 12px;
 `

 const TransactionDetails = styled.View`
 `

export default MyTransactionsScreen;