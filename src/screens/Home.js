import React, { Component } from 'react';
import { ScrollView,StyleSheet,  Text, TextInput, View, Button, Dimensions, Platform } from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Icon } from 'react-native-elements';
export default class Home extends Component {
    signOut() {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
      }

  render() {
    return (
        <ScrollView>
        <View style={styles.container}>
  

  <View style={{flexDirection: 'row', flex: 1}}>
    <View style={styles.column}>
    <Icon name="open-book" type="entypo" size={28} color='#89cff0' />
      <Text>Yes</Text>

    </View>
    <View style={styles.column}>
    <Text>Take Survey</Text>
    </View>
  </View>
</View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        borderColor:'green',
        flexDirection:'row',
        flexWrap: 'wrap',
        backgroundColor: 'white'

    },
    column:{

    width: '50%',
    borderColor: '#89cff0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150


    },
    input:{
      height:60,
      borderWidth:1,
      borderRadius:5,
      borderColor:'black',
      textAlign:'center',
      margin:10,
      paddingTop:20,
      paddingBottom:10

    },
    item:{
    borderColor:'red',
     borderWidth:2   


    },
    item2:{
     borderColor:'black',
     borderWidth:2,
     flexDirection:'column',
    }
})
