import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, View, Button, Dimensions, Platform, Alert} from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Icon } from 'react-native-elements';
import { LineChart, Grid } from 'react-native-svg-charts';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      notification_array: [],
      notificationObject: {},
      notification: {},
    };
  }

  signOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
      
  async componentDidMount() {
    let user = ""

    Auth.currentSession().then((res) => {
      user = res.idToken.payload['cognito:username']
      this.setState({user: user})
    });

    let notification_arrayfromserv = await API.get('notifyCRUD', `/notify/user`);
   
    this.setState({ notification_array: notification_arrayfromserv });

    if (this.state.notification_array && this.state.notification_array instanceof Array && this.state.notification_array.length > 0) {
      this.state.notification = this.state.notification_array.reduce(function(max, curr){ 
        return ( curr != undefined && curr.scheduled_at != null & max.scheduled_at != null && curr.scheduled_at > max.scheduled_at ) 
          ? curr : max;
        });
    }

    let notificationObject = this.state.notification;
    this.setState({ notificationObject: notificationObject });

    if (Object.keys(this.state.notification).length != 0) {
      this.surveryAlert();
    }
  }

  async issueSurvey() {
    this.props.navigation.navigate('SliderInput', {
      notification: this.state.notificationObject
    });
  }

  surveryAlert = () =>  {
    Alert.alert(
      'Time to check in!',
      '',
      [
        {text: 'Let\'s do it!', onPress: () => this.issueSurvey() },
        {text: 'Check in later' }
      ]
    )
  }

  render() {
    const fill = 'rgb(134, 65, 244)'
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={ styles.container }>
          <View>
            <View>
              <Text style={ styles.header }>Hi, { this.state.user }</Text>
              <Text style={ styles.subheader }>Check out your happiness metrics.</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={ styles.column }>
                <Text style={{ textAlign: 'center', fontSize: 16} }>30-Day{"\n"}Rolling Avg.</Text>
                <View style={{ 
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center' 
                }}>
                  <Text>3%</Text>
                </View>
              </View>
              <View style={ styles.column }>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Trend{"\n"}Rolling Avg.</Text>
                <View style={{ 
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center' 
                }}>
                  <Icon name="arrow-up" type="entypo" size={18} color='#00ff00'></Icon>
                  <Text>3%</Text>
                </View>
              </View>
            </View>
              <LineChart
                style={{ height: 200 }}
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
              >
            <Grid/>
          </LineChart>
            <View style={ styles.buttonContainer }>
              <TouchableHighlight 
                onPress = {() => this.props.navigation.navigate('Profile')} 
                style = { styles.buttonStyle }
              >
                <Text style = { styles.buttonText }>Profile</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderColor:'green',
        flexDirection:'row',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },

    column: {
    width: '50%',
    borderColor: '#89cff0',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150
    },

    header: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 20
    },

    subheader: {
      fontSize: 20,
      textAlign: 'center'
    },

    input: {
      height:60,
      borderWidth:1,
      borderRadius:5,
      borderColor:'black',
      textAlign:'center',
      margin:10,
      paddingTop:20,
      paddingBottom:10
    },

    item: {
    borderColor:'red',
     borderWidth:2   
    },

    item2: {
     borderColor:'black',
     borderWidth:2,
     flexDirection:'column',
    },

    buttonStyle: {
      width: '50%',
      padding: 6,
      backgroundColor: '#495875',
    },

    buttonText: {
      fontSize: 14,
      color: 'white',
      alignSelf: 'stretch',
      textAlign: 'center',
    },

    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
})
