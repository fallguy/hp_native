import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import SliderWidget from '../SliderWidget';

export default class ClassSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {notification: {} };
  }
  async componentDidMount() {
    let notification = await API.get('notifyCRUD', `/notify`);
    console.warn(notification);
    // this.setState({ notification });
  }

  render() {
    return (
      <View style={styles.container}>
       <SliderWidget notification={this.state.notification}/>
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
