import React,{useState,useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity,ActivityIndicator,Alert, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styled from "styled-components";
import Text from '../components/Text.js';
import {fetchExchangeRates} from '../service/getExchangeRates.js'


class ExchangeRatesScreen extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading : true,
        data : null
    }
}
componentDidMount(){
  fetchExchangeRates().then(data =>{
      this.setState({
        loading : false,
      data : data
  });
}).catch((e) =>{
 Alert.alert("Error", "Something went wrong with the server!");
});
}

render(){
  if(this.state.loading){ 
    return(
  <Container>
       <Text center large heavy margin="20px 0 0 0">Exchange Rates</Text>
       <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
  </Container> 
  );
  } else {
    const rates = this.state.data;
    console.log(rates)
    const labels = [ 'USD', 'GBP','JPY','AUD', 'CAD', 'CHF', 'HKD', 'INR', 'CZK', 'HUF','ILS','CLP','BAM','BND','BTC','COP','DZD','ERN','ETB','EUR','IRR','ISK','NAD','NOK','PGP','PHP','RON','RSD','RUB','TRY','TTD','UGX','UZS','XOF','XAF','XAG','YER','ZAR','ZMK','ZWL']
    return(
        <Container>
             <Text center large heavy margin="20px 0 0 0">Exchange Rates</Text>
             <ExchangeRatesHeader></ExchangeRatesHeader>
             <ExchangeRatesContainer>
                  {
                   
                          labels.map((item,key) => {
                             return (<ExchangeRateContainer key={item}>
                             <Text large heavy >{item}</Text>
                             <Text large heavy>{Number(rates[`${item}`]).toFixed(2) + '€'}</Text>
                             
                             </ExchangeRateContainer>)
                        })
                   }
              </ExchangeRatesContainer>
        </Container>
    );
    }
}
  }

  const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1e1e1e;
  `

  const ExchangeRatesContainer = styled.ScrollView`
  padding: 0 8px;
  margin-top: 32px;
  background-color: #292929;
`;
const ExchangeRatesHeader = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between`;

const ExchangeRateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #393939;
  padding-bottom: 12px;
  margin-bottom: 12px;
 `

export default ExchangeRatesScreen;