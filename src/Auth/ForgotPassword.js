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

import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import AmplifyTheme from 'aws-amplify-react-native';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements'
import { Username, Password, ConfirmationCode, LinkCell, Header, ErrorRow } from 'aws-amplify-react-native';
import AuthPiece from './AuthPiece';


const logger = new Logger('ForgotPassword');
const BG_IMAGE = require("../img/sun-bg.jpg");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const Footer = props => {
    const { theme, onStateChange, error } = props;
    return (
        <View style={styles.footerView}>
            
            <Text style={styles.link} onPress={() => onStateChange('signIn')}>Back to Sign In</Text>
            <Text style={{ marginTop: 15, color: 'red' }}>
                            {error}
                        </Text>
                       
                        
        </View>
    )
    // return React.createElement(
    //     View,
    //     { style: theme.sectionFooter },
    //     React.createElement(
    //         LinkCell,
    //         { theme: theme, onPress: () => onStateChange('signIn') },
    //         I18n.get('Back to Sign In')
    //     )
    // );
};

export default class ForgotPassword extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['forgotPassword'];
        this.state = { delivery: null };

        this.send = this.send.bind(this);
        this.submit = this.submit.bind(this);
    }

    send() {
        const { username } = this.state;
        if (!username) {
            this.error('Username cannot be empty');
            return;
        }
        Auth.forgotPassword(username).then(data => {
            logger.debug(data);
            this.setState({ delivery: data.CodeDeliveryDetails });
        }).catch(err => this.error(err));
    }

    submit() {
        const { username, code, password } = this.state;
        Auth.forgotPasswordSubmit(username, code, password).then(data => {
            logger.debug(data);
            this.changeState('signIn');
        }).catch(err => this.error(err));
    }

    forgotBody(theme) {
        return (
            <View>
                <FormInput placeholder="Username" placeholderTextColor="#fafafa" 
                autoCapitalize="none" autoCorrect={false}  inputStyle={styles.inputStyle} onChangeText={(text) => this.setState({ username: text })} />
                       
                      
                        <Button title='SEND CODE' color="#222" buttonStyle={styles.signIn} onPress={this.send} disabled={!this.state.username} />
            </View>
        );

        // return React.createElement(
        //     View,
        //     React.createElement(Username, {
        //         theme: theme,
        //         onChangeText: text => this.setState({ username: text })
        //     }),
        //     React.createElement(Button, {
        //         title: 'Send Code',
        //         onPress: this.send,
        //         disabled: !this.state.username
        //     })
        // );
    }

    submitBody(theme) {
        return (
            <View>
                <FormInput placeholder="Code" autoCapitalize="none" autoCorrect={false} 
                 placeholderTextColor="#fafafa"
                 inputStyle={styles.inputStyle} 
                 onChangeText={(text) => this.setState({ code: text })} />
                        <FormInput placeholder="New Password" autoCapitalize="none" 
                        autoCorrect={false} secureTextEntry={true} 
                        placeholderTextColor="#fafafa"
                        inputStyle={styles.inputStyle} 
                        onChangeText={(text) => this.setState({ password: text })} />
                      
                        <Button title='SUBMIT' buttonStyle={styles.signIn} onPress={this.submit} disabled={!this.state.username} />
            </View>
            
        );
        // return React.createElement(
        //     View,
        //     { style: theme.sectionBody },
        //     React.createElement(ConfirmationCode, {
        //         theme: theme,
        //         onChangeText: text => this.setState({ code: text })
        //     }),
        //     React.createElement(Password, {
        //         theme: theme,
        //         placeholder: 'New Password',
        //         onChangeText: text => this.setState({ password: text })
        //     }),
        //     React.createElement(Button, {
        //         title: I18n.get('Submit'),
        //         style: theme.button,
        //         onPress: this.submit,
        //         disabled: !this.state.username
        //     })
        // );
    }

    showComponent(theme) {
        return (
            <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                <View style={styles.loginView}>
                    <View style={styles.loginTitle}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.travelText}>FORGOT PASSWORD</Text>

                        </View>
                        <View>
                            <Text style={styles.welcomeText}>Hey! If you forgot your password, please enter your username and we'll send you a confirmation code!</Text>
                        </View>
                    </View>
                    <View style={styles.loginInput}>
                        {!this.state.delivery && this.forgotBody()}
                        {this.state.delivery && this.submitBody()}
                        <Footer onStateChange={this.changeState} theme={theme} error={this.state.error}></Footer>
                        
                    </View>
                    
                </View>
                
                {/* <ErrorRow theme={theme}>{this.state.error}</ErrorRow> */}
            </ImageBackground>

        )
        // return React.createElement(
        //     View,
        //     { style: theme.section },
        //     React.createElement(
        //         Header,
        //         { theme: theme },
        //         I18n.get('Forgot Password')
        //     ),
        //     React.createElement(
        //         View,
        //         { style: theme.sectionBody },
        //         !this.state.delivery && this.forgotBody(theme),
        //         this.state.delivery && this.submitBody(theme)
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
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
      },
    loginView: {
        marginTop: 0,
        backgroundColor: 'transparent',
        width: 250,
        height: 450,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: "#FAFAFA",
        fontSize: 30,
        textAlign: 'center'
    },
    plusText: {
        color: "#FAFAFA",
        fontSize: 30
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signIn: {
        backgroundColor: '#FFF',
        marginTop: 30,
        borderRadius:25
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 14,
        color: "#FAFAFA"
      },
    footerView: {
        marginTop: 20
    },
    inputStyle: {
        color: "#FAFAFA",
        width: 200
      },
      link: { fontSize: 14, color: "#ADD8E6", textAlign: "center" }
});