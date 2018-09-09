import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, Text, TextInput, View, Button, Dimensions, Platform, Alert} from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Icon } from 'react-native-elements';
import { AsyncStorage } from "react-native"
import { LineChart, Grid } from 'react-native-svg-charts';
import {SliderInput} from './SliderInput';
import { NavigationActions } from 'react-navigation';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      arrow_direction: 'minus',
      notification_array: [],
      notificationObject: {},
      notification: {},
      rolling_average: 0,
      yesterday_rolling_average: 0,
      trending_average: 0,
      todaysDate: {},
      graph: []
    };
  }

  async postUser (){
    let userObj = {}
    let session = Auth.currentCredentials().then((data) => {
      userObj.identityid = data.data.IdentityId;
      Auth.currentSession().then(async (user) =>{
        userObj.email = user.idToken.payload.email;
        userObj.phone = user.idToken.payload.phone_number;
        await API.post('usersCRUD', '/users', { body: userObj });
      })
    });
  }

  signOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  calculateGraph(data) {
    console.log('data',data)
    let graph = data.map((res) => {return res.wellness_value})
    
    this.setState({ graph });

  }
  
  async componentDidMount() {
    let user = "";
  
    var todaysCurrentEpoch = new Date();
    Auth.currentSession().then((res) => {
      user = res.idToken.payload['cognito:username']
      this.setState({user: user})
    });
    this.postUser();
    let yesterday_rolling_average = [];

    let notification_arrayfromserv = await API.get('notifyCRUD', `/notify/user`);
    let wellnessOfThisUser_arrayfromserv = await API.get('wellnessCRUD', `/wellness/user/from`);
    const latestThirtyDaysOfWellness = wellnessOfThisUser_arrayfromserv.map(function(wellness){ 
      return {
        wellness_value: wellness.wellness_value,
        answered_at: wellness.answered_at
      }
    });

    //console.log(latestThirtyDaysOfWellness);
    this.setState({ notification_array: notification_arrayfromserv });

    if (this.state.notification_array && this.state.notification_array instanceof Array && this.state.notification_array.length > 0) {
      this.state.notification = this.state.notification_array.reduce(function(max, curr){ 
        return ( curr != undefined && curr.scheduled_at != null & max.scheduled_at != null && curr.scheduled_at > max.scheduled_at ) 
          ? curr : max;
        });
    }

    // returns an array of wellness objects from today with answered_at and epoch time
    const getYesterdaysWellness = latestThirtyDaysOfWellness.filter(wellness => {
      var d = new Date(0);
      let dateFromUTCSeconds = d.setUTCSeconds(wellness.answered_at);
      if(todaysCurrentEpoch.toDateString() != d.toDateString()){
        yesterday_rolling_average.push({
            wellness_value: wellness.wellness_value,
            answered_at: wellness.answered_at
        });
        return wellness.wellness_value;
      }
    });
    
    function roundWithPrecision(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    
    function calculateRollingAverage(arrayOfWellnessValues){
      if (arrayOfWellnessValues[0] == undefined){
        return;
      }

      let sum = 0;
      for (var i = 0; i < arrayOfWellnessValues.length; i++) {
        sum += parseInt( arrayOfWellnessValues[i].wellness_value, 10);
      }
      rolling_average = sum/latestThirtyDaysOfWellness.length;
      return rolling_average; 
    };

    let rolling_average = roundWithPrecision(calculateRollingAverage(latestThirtyDaysOfWellness), 1);
    console.log("Rolling average: ", rolling_average);
    this.setState({ rolling_average: rolling_average });

    yesterday_rolling_average = roundWithPrecision(calculateRollingAverage(yesterday_rolling_average), 1);
    console.log("Yesterday's Rolling Average: ", yesterday_rolling_average);
    this.setState({ yesterday_rolling_average: yesterday_rolling_average })

    let notificationObject = this.state.notification;
    this.setState({ notificationObject: notificationObject });

      if (Object.keys(this.state.notification).length != 0) {
        this.surveryAlert();
      }

    this.calculateTrendingAverage(roundWithPrecision);
    this.calculateGraph(wellnessOfThisUser_arrayfromserv);
  }

  async issueSurvey() {
    console.log(this.state.notificationObject);
    //console.log(this.props.navigation);
    const navigateAction = NavigationActions.navigate({
      routeName: 'Tabs',


      // navigate can have a nested navigate action that will be run inside the child router
      action: NavigationActions.navigate({
        routeName: 'Survey',
        params: {
          notification: this.state.notificationObject
        }
      }),
    });

    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.navigate('SliderInput', {
    //   notification: this.state.notificationObject
    // });
  }

  async calculateTrendingAverage(){
    console.log(this.state.arrow_direction)
    console.log("Rolling average and Yesterday average: ", this.state.rolling_average, " ", this.state.yesterday_rolling_average);
    if (this.state.rolling_average < this.state.yesterday_rolling_average){
      this.setState({ arrow_direction: 'arrow-down' })
    }else {
      this.setState({ arrow_direction: 'arrow-up' })
    }
    console.log(this.state.arrow_direction)

    let temp_trending_average = this.state.rolling_average - this.state.yesterday_rolling_average;

    let trending_average = (temp_trending_average/this.state.yesterday_rolling_average) * 100;
    let precision = 1;
    var multiplier = Math.pow(10, precision || 0);
    trending_average =  Math.round(trending_average * multiplier) / multiplier;

    console.log("This is temp trending average: ", trending_average);
    this.setState({ trending_average: trending_average })
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
    //const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    
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
                  <Text>{ this.state.rolling_average }</Text>
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
                  <Icon name={ this.state.arrow_direction } type="entypo" size={18} color='#00ff00'></Icon>
                  <Text>{ this.state.trending_average }%</Text>
                </View>
              </View>
            </View>
              <LineChart
                style={{ height: 200 }}
                data={ this.state.graph }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
                yMin='0'
                yMax='10'
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
