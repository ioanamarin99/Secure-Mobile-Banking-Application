import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components"
import Text from './Text.js';

export const BankAccountsListItem = ({item, onPress}) =>{

    const [expanded, setExpanded] = useState(false);
    
    const onBankAccountPress = () => {
        onPress();
        setExpanded(!expanded);
    }

    return(
        <TouchableOpacity onPress={onBankAccountPress}>
        <AccountContainer>
        <AccountInfo>
    
            <AccountDetails>
              <Text heavy>Account number</Text>
              <Text small heavy color="#727479">{item.AccountNumber}</Text>
            <Text heavy>BIC/SWIFT</Text>
              <Text small heavy color="#727479">{item.BIC_SWIFT}</Text>
              {expanded && (
              <View>
               <Text heavy>Account owner</Text>
               <Text small heavy color="#727479">{item.AccountOwner}</Text>
               <Text heavy>Available balance</Text>
               <Text small heavy color="#727479">{Number(item.AvailableBalance).toFixed(2)}</Text>
               <Text heavy>Account balance</Text>
               <Text small heavy color="#727479">{Number(item.AccountBalance).toFixed(2)}</Text>
               <Text heavy>Account limits</Text>
               <Text small heavy color="#727479">{Number(item.AccountLimits).toFixed(2)}</Text> 
               <Text heavy>Blocked amounts</Text>
               <Text small heavy color="#727479">{Number(item.BlockedAmounts).toFixed(2)}</Text>
               </View>)}
            </AccountDetails>
            
            <AccountLogoContainer>
            <AccountLogo source={require("../res/romanian_account.png")}></AccountLogo>
            </AccountLogoContainer>
            <AccountActions>
    
            </AccountActions>
        </AccountInfo>
      </AccountContainer>
      </TouchableOpacity>
    )

}

const AccountContainer = styled.View`
 background-color: #292929;
 margin-bottom: 16px;
 padding: 16px;
 border-radius: 9px
 `;

 const AccountInfo = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #393939;
  padding-bottom: 12px;
  margin-bottom: 12px;
 `

 const AccountLogoContainer = styled.View`
   width: 140px;
   height: 70px;
   margin-top: -230px;
   align-items: flex-end;
   justify-content: flex-end;
   border-radius: 9px
 `

 const AccountLogo = styled.Image({
    width: "70px",
    height: "35px"
 })
 

 const AccountDetails = styled.View`
 flex: 1;
 align-items: flex-start
 `

 const AccountActions = styled.View({});