import React, { Component } from 'react';
import { StyleSheet,  Text, TextInput, View, Button, Dimensions, Platform } from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
export default class Profile extends Component {


    signOut() {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
      }

  render() {
    return (
      <View style={styles.container}>
              <Button
  onPress={this.signOut}
  title="Sign Out"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"></Button>
        <Text style={styles.title}>
          Profile
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
