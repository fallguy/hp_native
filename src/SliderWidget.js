import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';

export default class SliderWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { metric: 5, notification: {} };
    if (props.notification) { 
    	this.state.notification = props.notification;
    	}
  }
  async componentDidMount() {
  }
  getVal(val) {
    console.warn(val);
  }

  submitSlider (valueSubmit) {
    let surveys = this.state.survey;
    Alert.alert(
        'Are you sure you want to submit?',
        '',
            [
            {text: 'Cancel', onPress: () => console.warn('Cancel Pressed!')},
            {text: 'OK', onPress: () => okPress() }
          ]
    )
    
    function okPress(){
      console.warn('ok');
      console.warn(surveys, valueSubmit)
      // want this reflect same value as getVal function but it errors
      // console.warn(valueSubmit);
    }
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
            onPress={() => this.submitSlider(this.state.metric)}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: "center",
    backgroundColor: '#20b2aa'
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