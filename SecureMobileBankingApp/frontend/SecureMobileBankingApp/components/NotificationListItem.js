import React, {useEffect, useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components"
import Text from './Text.js';

export const NotificationListItem = ({item, onPress}) => {
    const [expanded, setExpanded] = useState(false);
    
    const onNotificationPress = () => {
        onPress();
        setExpanded(!expanded);
    }
    return(
        <TouchableOpacity onPress={onNotificationPress}>
        <NotificationContainer>
        <NotificationInfo>
        <NotificationIconContainer>
           <NotificationIcon source={require("../res/message-icon.png")}></NotificationIcon>
          </NotificationIconContainer>
        <NotificationDetails>
        <Text heavy>{item.title}</Text> 
            <Text small heavy color="#727479">{item.date + " " + item.time}</Text>
             <Text small heavy color="#727479">{item.category}</Text>
             {expanded && (
                  <Text small heavy color="#727479">{item.text}</Text>)
             }
            
        </NotificationDetails>
        </NotificationInfo>
      </NotificationContainer>
      </TouchableOpacity>
    )
}

const NotificationInfo = styled.View`
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-bottom-color: #393939;
padding-bottom: 12px;
margin-bottom: 12px;
`
const NotificationContainer = styled.View`
background-color: #292929;
margin-bottom: 16px;
padding: 16px;
border-radius: 9px
`;

const NotificationDetails = styled.View`
flex: 1;
align-items: flex-start
`
const NotificationIconContainer = styled.View`
width: 40px;
height: 10px;
align-items: flex-start;
justify-content: flex-start;
border-radius: 9px
margin-top: -33px;
`

const NotificationIcon = styled.Image({
width: "25px",
height: "25px"
})
