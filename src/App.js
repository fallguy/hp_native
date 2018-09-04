import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { API, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { StyleSheet,  Text, TextInput, View, Button, Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { createRootNavigator } from './router'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import VerifyContact from './Auth/Verify'
import ConfirmSignIn from './Auth/ConfirmSignIn'
import ConfirmSignUp from './Auth/ConfirmSignUp'
import ForgotPassword from './Auth/ForgotPassword';
Amplify.configure(aws_exports);

const RootStack = createRootNavigator();

class App extends React.Component {

  render() {
    var state = this.state;
    return (
      <RootStack />
    );
  }
}

export default withAuthenticator(App, false, [
  <SignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <SignUp/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>
]);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
