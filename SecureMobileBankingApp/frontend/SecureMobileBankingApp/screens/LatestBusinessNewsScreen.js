import React from 'react';
import {View, StyleSheet,ActivityIndicator,Alert,Dimensions,Image,TouchableWithoutFeedback, Linking} from 'react-native';
import styled from "styled-components"
import Text from '../components/Text.js';
import {fetchArticles} from '../service/getNews.js';

const {width,height} =Dimensions.get("window");

class LatestBusinessNewsScreen extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loading : true,
            data : null
        }
    }

    componentDidMount(){
      fetchArticles().then(data =>{
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
           <Text center large heavy margin="20px 0 0 0">My News</Text>
           <ActivityIndicator size="large" color="#fff"></ActivityIndicator>
      </Container> 
      );
      } else {
        console.log(this.data)
        return(
            <Container>
                 <Text center large heavy margin="20px 0 0 0">My Latest Business News</Text>
                 <Text title heavy margin="15px 0 0 25px">Headlines</Text>
                 <Text title heavy margin="8px 0 0 25px">in Business</Text>
                 <ArticlesList data={this.state.data} renderItem={({item}) =>{
                     return(
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
                       <ArticleContainer>
                           <Image source={{uri : item.urlToImage}} style={[StyleSheet.absoluteFill, {borderRadius:15}]}></Image>
                           <DarkerEffect>
                          <Text large heavy style={{position:'absolute',bottom:0, padding:5}}>{item.title}</Text>
                         </DarkerEffect>
                       </ArticleContainer>
                       </TouchableWithoutFeedback>
                     )
                 }} keyExtractor={(item,index) => index.toString()}>
                 </ArticlesList>
            </Container>
              );
        }
    }
}


const Container = styled.SafeAreaView`
flex: 1;
background-color: #1e1e1e;
`
const ArticlesList = styled.FlatList`
  padding: 0 8px;
  margin-top: 32px;
`;

const ArticleContainer = styled.View`
background-color: #292929;
margin-bottom: 16px;
border-radius: 15px;
width: 400px;
height: 200px;
`
const DarkerEffect = styled.View`
flex : 1
border-radius: 15px;
background-color : 'rgba(0,0,0,0.5)'
`
export default LatestBusinessNewsScreen;