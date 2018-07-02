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
      notification: {},
      survey: []

    }
  }

  async componentDidMount() {
    let survey = await API.get('surveysCRUD', `/surveys/390a18f1-4878-4318-b6e3-3ae967c1dd41`);
    this.setState({ survey });
  }

  async handleAddSubmission(newSubmission) {
    console.warn(newSubmission);
    await API.post('wellnessCRUD', '/wellness', { body: newSubmission });
  }

  render() {
    const { navigation } = this.props;
    const notification = navigation.getParam('notification');

    return (
      <View style={styles.container}>
       {this.state.user_sub}
       {notification &&
           <SliderWidget navigation={this.props.navigation} notification={notification} submitSlider={this.handleAddSubmission.bind(this)}/>
        }
        {!notification && this.state.survey.length > 0 &&
           <SliderWidget navigation={this.props.navigation} survey={this.state.survey[0]} submitSlider={this.handleAddSubmission.bind(this)}/>
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
