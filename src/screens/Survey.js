import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Survey extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} >
          <Text style={styles.title}>Survey</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
