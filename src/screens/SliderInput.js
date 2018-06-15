import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import Survey from './Survey';

export default class ClassSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { metric: 5, survey: [] };
  }
  async componentDidMount() {
    let surveyList = await API.get('surveysCRUD', `/surveys`);
    this.setState({ survey: surveyList });
  }
  getVal(val) {
    console.warn(val);
  }

  onPressLearnMore (valueSubmit) {
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
      console.warn(surveys)
      // want this reflect same value as getVal function but it errors
      console.warn(valueSubmit);
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.question}>Are you happy?</Text>
          
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
            onPress={() => this.onPressLearnMore(this.state.metric)}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
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
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    color: "#333333",
    margin: 5
  },
  sliderContainer: {
    alignItems: "center",
    backgroundColor: '#20b2aa'

  },
  descriptor: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: '90%'
  },
  metric: {
    fontSize: 20,
    textAlign: "center",
    // alignItems: 'center',
    margin: 10
  }
});
