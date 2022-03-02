import axios from 'axios';
import React, { useEffect,useContext,useState,useRef } from 'react';
import styled from "styled-components"
import Text from '../components/Text.js';
import {API_URI} from '../config/config.js';
import SecureStorage from 'react-native-secure-storage';
import {Alert, ActivityIndicator } from 'react-native';
import {AuthenticationContext}  from '../components/context.js';
import {Transitioning, Transition} from 'react-native-reanimated';
import { CardListItem } from '../components/CardListItem.js';

const MyCardsScreen= () => {

  const [cards, getCards] = useState('');
  const [loading, setLoading] = useState(true);
  const {logout} = useContext(AuthenticationContext);
  const transitionRef = useRef();
  const transition = <Transition.Change interpolation="easeInOut"></Transition.Change>

  const onPress = () =>{
    transitionRef.current.animateNextTransition();
  }

  useEffect(() => {
      getAllCards();
  }, []);
  
  const getAllCards = async() =>{
    const token = await SecureStorage.getItem("@token");
  if(token){
    await axios({
      method: 'GET',
      url: `${API_URI}/api/userCards`,
      headers: {'Content-Type': 'application/json',
         'auth-token' : token }
    }).then((res) =>{
      const allCards = res.data;
      getCards(allCards);
      setLoading(false);
    }).catch((e) =>{ console.log(e.response.data.message)
    Alert.alert("You have been logged out! " + e.response.data.message);
    logout();
  });
  }
  }

  const renderCard = ({item}) => (
  
    <CardListItem item={item} onPress={onPress}></CardListItem>
  )
    return (
      loading ? (<Container>
         <Text center large heavy margin="20px 0 0 0">My Cards</Text>
         <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
      </Container>) :
      ( <Transitioning.View style={{flex:1, backgroundColor:'#1e1e1e' }} ref={transitionRef} transition={transition}>
        <Text center large heavy margin="20px 0 0 0">My Cards</Text>
        <CardList data={cards} renderItem={renderCard} keyExtractor={(item,index) => index.toString()}></CardList>
        <StatusBar barStyle="light-content"></StatusBar>
      </Transitioning.View>)
    );
    
  };

 const Container = styled.SafeAreaView`
 flex: 1;
 background-color: #1e1e1e;
 `
const CardList = styled.FlatList`
  padding: 0 8px;
  margin-top: 32px;
`;

const StatusBar = styled.StatusBar({});

export default MyCardsScreen;