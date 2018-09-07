import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, View, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import uuid from 'uuid';
import { Constants, MapView, Location, Permissions } from 'expo';
import {Slider} from 'react-native-elements'
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
      survey: {},
    };
    this.state.notification = this.props.notification;
  }

  componentDidMount() {
    this._getLocationAsync();
    let notificationObject = this.props.notification;
    let survey = this.props.survey;
    if(!survey){
      survey = notificationObject.survey;
    }
    let user_id = ""
    Auth.currentCredentials().then((data) => {
      let user_id = data.data.IdentityId;
      this.setState({user_id: user_id})
    });
    this.setState({ survey: survey, notification: notificationObject, notificationObject: notificationObject });
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
    let notification_object = null;
    if(this.state.notification) {
      let notification = this.state.notification;
      notification_object = this.state.notificationObject;
    }
    const survey = this.state.survey;
    const location_object = this.state.locationObject;
    const id = uuid.v4();
    const answered_at = currentUnixTime;
    const sliderVal = this.state.metric;
    const app_version = this.state.app_version;
    console.log(this.state.user_id)
    const newSubmission = { 
      "id": id.toString(),
      "user_id": this.state.user_id,
      "answered_at": answered_at,
      "wellness_value": sliderVal,
      "app_version": app_version,
      "notification": notification_object,
      "survey": survey,
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
        { text: 'Cancel', onPress: () => console.warn('Cancel Pressed!') },
        { text: 'OK', onPress: () => this.okPress() }
      ]
    )
  }

  leaveSurvey = () =>  {
    Alert.alert(
      'Are you sure you want to skip the question?',
      '',
      [
        { text: 'Cancel', onPress: () => console.warn('Cancel Pressed!') },
        { text: 'Yes, Leave me Alone', onPress: () => this.props.navigation.navigate('Profile') }
      ]
    )
  }

  render() {
    return (
      <View>
        <Text style={styles.question}>{this.state.survey.question}</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.descriptor}>
            <Text>Not at all</Text>
            <Text>Extremely</Text>
          </View>
          <Slider
            style={{ width: '90%' }}
            animateTransition={true}
            step={1}
            minimumValue={0}
            maximumValue={10}
            value={this.state.metric}
            onValueChange={val => this.setState({ metric: val })}
            onSlidingComplete={val => this.getVal(val)}
          />
          <Text style={styles.metric}>{this.state.metric}</Text>
        </View>
        <View style={ styles.button_container }>
          <TouchableHighlight
            onPress={() => this.submitSlider(this.state.newSubmission)}
            style={ styles.button_submit }
          >
            <Text style={ styles.button_text }>Submit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.leaveSurvey()}
            style={ styles.button_skip }
          >
            <Text style={ styles.button_text }>Skip</Text>
          </TouchableHighlight>
        </View>
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
  },

  button_submit: {
    width: '50%',
    backgroundColor: '#f39558',
    padding: 6,
    borderRadius: 15,
  },

  button_skip: {
    width: '33%',
    backgroundColor: '#eec8b0',
    padding: 6,
    marginTop: 10,
    borderRadius: 15,
  },

  button_text: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'stretch',
    textAlign: 'center',
  },

  button_container: {
    alignItems: 'center',
  }
});
