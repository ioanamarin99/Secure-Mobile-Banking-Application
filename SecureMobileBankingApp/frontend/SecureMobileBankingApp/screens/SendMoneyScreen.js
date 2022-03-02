import React,{useState,useEffect,useContext} from 'react';
import {View, StyleSheet, TouchableOpacity,Alert,ActivityIndicator,Clipboard} from 'react-native';
import styled from "styled-components";
import Text from '../components/Text.js';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {API_URI} from '../config/config.js';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import {AuthenticationContext}  from '../components/context.js';
import DialogInput from 'react-native-dialog-input';


const SendMoneyScreen = ({navigation}) =>{
  const [isDialogVisible, setDialog] = useState(false);
  const {logout} = useContext(AuthenticationContext);
  const [bankAccountData, getBankAccountData] = useState([]);
  const [userData, getUserData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("transfer");
  const [accountNumber, setAccountNumber] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date())
  const [availableBalance, setAvailableBalance] = useState("");
  const [loading, setLoading] = useState(true);
 

  useEffect(()=>{
     getBankAccount(),getUser();
  },[]);

  const getBankAccount = async() =>{
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
             getBankAccountData(account)
             setAvailableBalance(account.AvailableBalance);
        }
      }
          
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
      logout();
    });
      
  }
  }

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
       getUserData(userData);
       setLoading(false);
    }).catch((e) =>{ console.log(e.response.data.message)
      Alert.alert("You have been logged out! " + e.response.data.message);
      logout();
    });  
  }
  }
  const showDialog = (show) =>{
    if(accountNumber.length != 0 && beneficiary.length != 0 && description.length != 0 && amount.length != 0){
       if(bankAccountData.AvailableBalance < amount || bankAccountData.AvailableBalance == 0){
         Alert.alert("You don't have enough money in your current account!")
     } else if(accountNumber.length > 24){
       Alert.alert("Account number is too long!");
     } else if(accountNumber.length < 24){
       Alert.alert("Account number is too short!")
     } else if(!amount || !typeof(amount) === 'number'){
       Alert.alert("Amount is mandatory, it must be a number!");
     }
     else{
       setDialog(show);
     }
   } else{
    Alert.alert("Please make sure all fields are filled in correctly!");
   }
   }

 const transactionHandler = async() =>{
   
   var id = 1;
   if(selectedValue == 'transfer'){
     id = 1;
   } else if(selectedValue == 'onlinePayment'){
     id = 2;
   } else if(selectedValue == 'billPayment'){
     id = 3;
   } 
   var year = date.getFullYear();
   var month = date.getMonth();
   month++;
   var day = date.getUTCDate();

   var newDate = year.toString().padStart(4,'0') + '-' + month.toString().padStart(2,'0') + '-' + day.toString().padStart(2,'0');
  
   const transactionData = JSON.stringify({
     "TransactionTypeID": Number(id),
     "TransactionDate": newDate,
     "ValueDate" : newDate,
     "Amount" : -Number(amount),
     "BeneficiaryOrRemitter" : beneficiary,
     "AssociatedIAccountNumber" : accountNumber,
     "Description": description,
     "UserID": Number(userData.UserID), 
     "AccountID": Number(bankAccountData.AccountID)
   });
   const token = await SecureStorage.getItem("@token");
   if(token){
     let ok = true;
   await axios({
            method: 'POST',
            url: `${API_URI}/api/transaction`,
            data: transactionData,
            headers: {'Content-Type': 'application/json',
            'auth-token' : token }
        }).then((res) =>{ 
          console.log("RESPONSE " +res.data.hasErrors)
          if(res.data.hasErrors){
            ok = false;
          Alert.alert(res.data.message);
          } 
        }).catch((e) =>{console.log(e.response.data.message);
          ok = false;
        Alert.alert(e.response.data.message); 
    });
    console.log("ok " + ok)
     if(ok){
    bankAccountData.AvailableBalance -= Number(amount).toFixed(2);
    bankAccountData.AccountBalance = bankAccountData.AvailableBalance;
   setAvailableBalance(bankAccountData.AvailableBalance);
    await axios({
      method: 'PUT',
            url: `${API_URI}/api/bankAccount/${bankAccountData.AccountID}`,
            data: bankAccountData,
            headers: {'Content-Type': 'application/json',
            'auth-token' : token }
    }).then((res) => {
      if(res.data.hasErrors)
      Alert.alert(res.data.message);
      else  {
        Alert.alert("Your transaction has been successfully completed! ");
        setAccountNumber("");
        setBeneficiary("");
        setAmount("");
        setDescription("");
    }
    }).catch((e) =>{console.log(e.response.data.message);
    });
  }
   }

 }
 const sendInput = async(input) =>{
  console.log("password " + input);
  const token = await SecureStorage.getItem("@token");
  if(token){
     const password = JSON.stringify({'UserPassword': input});
    await axios({
      method: 'POST',
      url: `${API_URI}/api/transactionConfirmation`,
      data: password,
      headers: {'Content-Type': 'application/json',
      'auth-token' : token }
    }).then((res) =>{
      if(res.data.message === "Invalid password!"){
        Alert.alert(res.data.message)
      } else if(res.data.message === "Correct password!"){
           transactionHandler();
      }
    }).catch((e) =>{
      console.log(e.response.data.message);
      Alert.alert(e.response.data.message);
    });
  }
}

    return (
      loading ? (<Container>
        <Text center large heavy margin="20px 0 0 0">Send money</Text>
        <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
      </Container>) :
      (<Container>
        <Text center large heavy margin="20px 0 0 0">Send money</Text>
      <Text></Text>
      <Text center title black value = {availableBalance} onChangeText={(val) => setAvailableBalance(val)}>{Number(availableBalance).toFixed(2)} RON</Text>
      <Text center heavy color="#727479">Available balance</Text>
      <TransactionFieldsContainer>
        <TextInputContainer>
        <Field placeholder="Account number" value={accountNumber} onChangeText={(val) => setAccountNumber(val)}></Field>
        </TextInputContainer>
        <TextInputContainer>
        <Field placeholder="Beneficiary" placeHolderTextColor="#dbdbdb" value={beneficiary} onChangeText={(val) => setBeneficiary(val)}></Field>
        </TextInputContainer>
        <TextInputContainer>
        <Field placeholder="Amount" value={amount} onChangeText={(val) => setAmount(val)}></Field>
        </TextInputContainer> 
        <TextInputContainer>
        <Field placeholder="Description" value={description} onChangeText={(val) => setDescription(val)}></Field>
        </TextInputContainer>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 400, color: '#dbdbdb'}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Transfer" value="transfer"></Picker.Item>
        <Picker.Item label="Online payment" value="onlinePayment"></Picker.Item>
        <Picker.Item label="Bill payment" value="billPayment"></Picker.Item>
      </Picker>
    
      <DatePicker date={date} mode='date' onDateChange={setDate} format="YYYY-MM-DD" style = {{alignSelf: 'center'}}></DatePicker>

      <DialogInput isDialogVisible={isDialogVisible}
                    title={"Transaction confirmation"}
                    message={"Please confirm your password!"}
                    hintInput ={"your #password"}
                    textInputProps={{secureTextEntry:true}}
                    submitInput={ (inputText) => {sendInput(inputText); showDialog(false)} }
                    closeDialog={ () => {showDialog(false)}}>
        </DialogInput>
             <SendButton onPress={() => {showDialog(true)}}>
                 <Text medium heavy>Send</Text>
            </SendButton>
      </TransactionFieldsContainer>
      </Container>)
    );
  };

  const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1e1e1e;
  `
  const TransactionFieldsContainer = styled.ScrollView`
  padding: 0 8px;
  margin-top: 32px;
  background-color: #292929;
`;
const TextInputContainer = styled.View`
flex-direction: row;
align-items: center;
background-color: #3d3d3d;
padding: 0 8px;
border-radius: 6px;
margin: 16px 0;`

const Field = styled.TextInput`
flex: 1;
padding: 8px 16px;
font-family: "Avenir";
color: #dbdbdb`;

const SendButton = styled.TouchableOpacity`
margin: 16px;
background-color: #5196f4;
padding: 16px 32px;
align-items: center;
border-radius: 12px;
`
export default SendMoneyScreen;