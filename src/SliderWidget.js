import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import uuid from 'uuid';
import { Constants, MapView, Location, Permissions } from 'expo';




var currentUnixTime = Math.round((new Date()).getTime() / 1000);


export default class SliderWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
    	metric: 5,
      notification_array: [],
      currentUnixTime: 0,
      app_version: "1.0.0",
      location: {},
      user_id: "",
    	notification: props.notification,
      notification_object: {},
      survey_object: {},
    };
      
    this.state.notification = this.props.notification;
      
    
	}

  componentDidMount() {
    this._getLocationAsync();

    let notificationObject = this.props.notification;
    this.setState({ notification: notificationObject, notificationObject: notificationObject });
  }

  getVal(val) {
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   this.setState({ locationObject: location });
  };

  okPress (valueSubmit) {

    let notification = this.state.notification;

    const notification_object = this.state.notificationObject;
    const survey_object = this.state.notification.survey;
    const location_object = this.state.locationObject;

    const id = uuid.v4();
    const answered_at = currentUnixTime;
    const sliderVal = this.state.metric;
    const app_version = this.state.app_version;
    const user_id = notification.user_id;
    const newSubmission = { 
      "id": id.toString(),
      "user_id": user_id,
      "answered_at": answered_at,
      "wellness_value": sliderVal,
      "app_version": app_version,
      "notification": notification_object,
      "survey": survey_object,
      "location": location_object,
    };
    this.props.submitSlider(newSubmission);
  }


  submitSlider = () =>  {
    let notification = this.state.notification;
    Alert.alert(
        'Are you sure you want to submit?',
        '',
            [
            {text: 'Cancel', onPress: () => console.warn('Cancel Pressed!')},
            {text: 'OK', onPress: () => this.okPress() }
            ]
    )
  }

  leaveSurvey = () =>  {
    Alert.alert(
        'Are you sure you want to skip the question?',
        '',
            [
            {text: 'Cancel', onPress: () => console.warn('Cancel Pressed!')},
            {text: 'Yes, Leave me Alone', onPress: () => this.props.navigation.navigate('Profile') }
            ]
    )
  }
  

  render() {
    return (
        <View>
          <Text style={styles.question}>{this.state.notification.survey.question}</Text>
          <View style={styles.sliderContainer}>
          <View style={styles.descriptor}>
            <Text>Not at all</Text>
            <Text>Extremely</Text>
          </View>
            <Slider
              style={{ width: '90%' }}
              step={1}
              minimumValue={0}
              maximumValue={10}
              value={this.state.metric}
              onValueChange={val => this.setState({ metric: val })}
              onSlidingComplete={val => this.getVal(val)}
            />
            <Text style={styles.metric}>{this.state.metric}</Text>
          </View>
          <Button
            onPress={() => this.submitSlider(this.state.newSubmission)}
            title="Submit"
            color="#841584"
          />
          <Button
            onPress={() => this.leaveSurvey()}
            title="Skip Question"
            color="#841584"
          />


        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: "center",
    backgroundColor: '#F5FCFF'
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    color: "#333333",
    margin: 5
  },
  descriptor: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: '90%'
  },
  metric: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});