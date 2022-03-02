import React, {useEffect, useState} from 'react';
import { View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components"
import Text from './Text.js';

export const CardListItem = ({item, onPress}) =>{

    const [expanded, setExpanded] = useState(false);
    
    const onCardPress = () => {
        onPress();
        setExpanded(!expanded);
    }

    return(
        <TouchableOpacity onPress={onCardPress}>
        <CardContainer>
    <CardInfo>
      <CardLogoContainer>
        {
        item.CardTypeID == 1 ? 
        (<CardLogo source={require("../res/visa-logo.jpg")}></CardLogo>) :
        item.CardTypeID == 2 ?
        (<CardLogo source={require("../res/mastercard-logo.png")}></CardLogo>):
        (<CardLogo source={require("../res/maestro-logo.png")}></CardLogo>)
       }
        </CardLogoContainer>

        <CardDetails>
          <Text heavy>Cardholder name</Text>
          <Text small heavy color="#727479">{item.CardHolder}</Text>
          <Text heavy>Card number</Text>
          <Text small heavy color="#727479" secureTextEntry={true}>{"**** **** **** " + item.CardNumber.substring(10,14)}</Text>
          {expanded && (
          <CardDetails>
           <Text heavy >Status</Text>
           <Text small heavy color="#727479">{item.CardStatus}</Text> 
           <Text heavy>Expiration date</Text>
           <Text small heavy color="#727479">{item.ExpiryDate}</Text>
           <Text heavy>Credit limits</Text>
           <Text small heavy color="#727479">{Number(item.CreditLimit).toFixed(2)}</Text> 
           </CardDetails>)}
        </CardDetails>

        <CardActions>

        </CardActions>
    </CardInfo>
  </CardContainer>
  </TouchableOpacity>
    )
}

const CardContainer = styled.View`
 background-color: #292929;
 margin-bottom: 16px;
 padding: 16px;
 border-radius: 9px
 `;

 const CardInfo = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #393939;
  padding-bottom: 12px;
  margin-bottom: 12px;
 `

 const CardLogoContainer = styled.View`
   width: 140px;
   height: 70px;
   align-items: center;
   justify-content: center;
   border-radius: 9px
 `

 const CardLogo = styled.Image({
   width: "140px",
   height: "90px"
 })
 

 const CardDetails = styled.View`
 flex: 1;
 align-items: flex-end
 `

 const CardActions = styled.View({});