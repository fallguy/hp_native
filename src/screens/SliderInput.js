import React, { Component } from "react";
import { StyleSheet, Text, View, Slider } from "react-native";

export default class ClassSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { metric: 5 };
  }
  getVal(val) {
    console.warn(val);
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
    backgroundColor: "powderblue",
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    color: "#333333",
    margin: 5
  },
  descriptor: {
    // flex: 1,
    justifyContent: "space-between",
    // alignItems: 'center',
    flexDirection: "row",

    width: '90%'
  },
  sliderContainer: {
    
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#F5FCFF'

  },
  metric: {
    fontSize: 20,
    textAlign: "center",
    // alignItems: 'center',
    margin: 10
  }
});
