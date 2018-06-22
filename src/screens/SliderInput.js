import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import SliderWidget from '../SliderWidget';
import { createStackNavigator } from 'react-navigation';


export default class ClassSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification_array: [],
      metric: 0,
      user_sub: "",
    };
  }
  async componentDidMount() {
    let notification_arrayfromserv = await API.get('notifyCRUD', `/notify/`);
    this.setState({ notification_array: notification_arrayfromserv });
  }

  async handleAddSubmission(newSubmission) {
    let notification = this.state.notification_array;
    await API.post('wellnessCRUD', '/wellness', { body: newSubmission });
    // notification.push(newNotification);
    // this.setState({ notification }); 

  }

  render() {
    return (
      <View style={styles.container}>
       {this.state.user_sub}
       {this.state.notification_array.length > 0 &&
         <SliderWidget notification_array={this.state.notification_array} submitSlider={this.handleAddSubmission.bind(this)}/>
        }
      
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  }
});
