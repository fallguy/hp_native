/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions
} from "react-native";
import { Auth, I18n, Logger } from "aws-amplify";
import AuthPiece from "./AuthPiece";
import {
  Username,
  Password,
  LinkCell,
  Header,
  ErrorRow
} from "aws-amplify-react-native";
import AmplifyTheme from "aws-amplify-react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Input,
  Button
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const logger = new Logger("SignIn");
const BG_IMAGE = require("../img/sun-bg.jpg");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Footer = props => {
  let { theme, onStateChange, error } = props;
  let forgetPw = false;
  if (error && error.includes("password")) {
    forgetPw = true;
  }
  console.log('footer',theme)
  return (
    <View style={theme.footerView}>
      <Text style={{ textAlign: "center", color: "#FAFAFA" }}>New here?</Text>
      <Text style={theme.link} onPress={() => onStateChange("signUp")}>
        Create an Account
      </Text>
      <Text style={{ marginTop: 15, color: "red" }}>{error}</Text>
      {forgetPw ? (
        <Text
          style={theme.link}
          onPress={() => {
            onStateChange("forgotPassword");
            error = false;
            forgetPw = false;
          }}
        >
          Forgot Password?
        </Text>
      ) : (
        <Text />
      )}
    </View>
  );
  // return React.createElement(
  //     View,
  //     { style: theme.sectionFooter },
  //     React.createElement(
  //         LinkCell,
  //         { theme: theme, onPress: () => onStateChange('forgotPassword') },
  //         I18n.get('Forgot Password')
  //     ),
  //     React.createElement(
  //         LinkCell,
  //         { theme: theme, onPress: () => onStateChange('signUp') },
  //         I18n.get('Sign Up')
  //     )
  // );
};

export default class SignIn extends AuthPiece {
  constructor(props) {
    super(props);

    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.state = {
      username: null,
      password: null,
      error: null
    };

    this.checkContact = this.checkContact.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  checkContact(user) {
    Auth.verifiedContact(user).then(data => {
      logger.debug("verified user attributes", data);
      if (data.verified) {
        this.changeState("signedIn", user);
      } else {
        user = Object.assign(user, data);
        this.changeState("verifyContact", user);
      }
    });
  }

  signIn() {
    const { username, password } = this.state;
    logger.debug("Sign In for " + username);
    console.log("Sign In for " + username);
    Auth.signIn(username, password)
      .then(user => {
        logger.debug(user);
        console.log("login " + user);
        const requireMFA = user.Session !== null;
        if (user.challengeName === "SMS_MFA") {
          this.changeState("confirmSignIn", user);
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          logger.debug("require new password", user.challengeParam);
          this.changeState("requireNewPassword", user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => this.error(err));
  }

  showComponent(theme) {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ImageBackground source={BG_IMAGE} style={theme.bgImage}>
          <View style={theme.loginView}>
            <View style={theme.loginTitle}>
              <View style={{ flexDirection: "row" }}>
                <Text style={theme.travelText}>ALPHA</Text>
              </View>
              <View style={{ marginTop: -10 }}>
                <Text style={theme.travelText}>STATE</Text>
              </View>
              <View>
                <Text style={theme.welcomeText}>
                  Welcome! How do you feel right now? Please login.
                </Text>
              </View>
            </View>
            <View style={theme.loginInput}>
              <FormInput
                placeholder="Username"
                autoCapitalize="none"
                placeholderTextColor="#fafafa"
                autoCorrect={false}
                inputStyle={theme.inputStyle}
                onChangeText={text => this.setState({ username: text })}
                underlineColorAndroid="#bdc6cf"
              />
              <FormInput
                placeholder="Password"
                autoCapitalize="none"
                placeholderTextColor="#fafafa"
                autoCorrect={false}
                secureTextEntry={true}
                inputStyle={theme.inputStyle}
                onChangeText={text => this.setState({ password: text })}
                underlineColorAndroid="#bdc6cf"
              />

              <Button
                title="SIGN IN"
                buttonStyle={theme.signIn}
                onPress={this.signIn}
                disabled={!this.state.username || !this.state.password}
                color="#222"
              />
              <Footer
                onStateChange={this.changeState}
                theme={theme}
                error={this.state.error}
              />
            </View>
          </View>

          {/* <ErrorRow theme={theme}>{this.state.error}</ErrorRow> */}
        </ImageBackground>
      </KeyboardAvoidingView>
    );
    // return React.createElement(
    //     View,
    //     { style: theme.section },
    //     React.createElement(
    //         Header,
    //         { theme: theme },
    //         I18n.get('Sign In')
    //     ),
    //     React.createElement(
    //         View,
    //         { style: theme.sectionBody },
    //         React.createElement(Username, {
    //             theme: theme,
    //             onChangeText: text => this.setState({ username: text })
    //         }),
    //         React.createElement(Password, {
    //             theme: theme,
    //             onChangeText: text => this.setState({ password: text })
    //         }),
    //         React.createElement(Button, {
    //             title: I18n.get('Sign In'),
    //             style: theme.button,
    //             onPress: this.signIn,
    //             disabled: !this.state.username || !this.state.password
    //         })
    //     ),
    //     React.createElement(Footer, { theme: theme, onStateChange: this.changeState }),
    //     React.createElement(
    //         ErrorRow,
    //         { theme: theme },
    //         this.state.error
    //     )
    // );
  }
}
