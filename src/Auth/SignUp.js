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
import { View, Text, TextInput, TouchableHighlight, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import AmplifyTheme from 'aws-amplify-react-native';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements'
import { Username, Password, Email, PhoneNumber, LinkCell, Header, ErrorRow } from 'aws-amplify-react-native';
import AuthPiece from './AuthPiece';
import { TextInputMask } from 'react-native-masked-text'
const logger = new Logger('SignUp');

const Footer = props => {
    const { theme, onStateChange, error } = props;
    let forgetPw = false;
    if(error && error.includes("password")){
        forgetPw = true;
    }
    return (
        <View style={styles.footerView}>
           
            <Text style={{fontSize:14,color: '#007bff', textAlign: 'center'}} onPress={() => onStateChange('signIn')}>Login</Text>
            <Text style={{ marginTop: 15, color: 'red' }}>
                            {error}
                        </Text>
                        {forgetPw ? (
  <Text style={{fontSize:14,color: '#007bff', textAlign: 'center'}} onPress={() => onStateChange('forgotPassword')}>Forgot Password?</Text>
                        ):(
                            <Text></Text>
                        )}
                        
        </View>
    )
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


export default class SignUp extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['signUp'];
        this.state = {
            username: null,
            password: null,
            email: null,
            phone_number: null
        };

        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { username, password, email, phone_number } = this.state;
        logger.debug('Sign Up for ' + username);
        Auth.signUp(username, password, email, phone_number).then(data => {
            logger.debug(data);
            this.changeState('confirmSignUp', username);
        }).catch(err => this.error(err));
    }

    changePhone(amount){
        console.log(amount)
        if(amount != undefined){
            let phone_number = '+1'+this.amountRef.getRawValue();
            this.setState({phone_number, raw_phone: amount})
            console.log(this.state.phone_number)
        }
      
    }

    showComponent(theme) {
        return (
            <KeyboardAvoidingView style={styles.bgImage} behavior="padding" enabled>
                <View style={styles.loginView}>
                    <View style={styles.loginTitle}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.travelText}>SIGN UP</Text>

                        </View>
                        <View>
                            <Text style={styles.welcomeText}>Thanks for joining.</Text>
                            <Text style={styles.welcomeText}>You are one step away to keeping track of your happiness!</Text>
                        </View>
                       
                    </View>
                    <View style={styles.loginInput}>
                        <FormInput placeholder="Username" autoCapitalize="none" autoCorrect={false} inputStyle={{width:200}} onChangeText={(text) => this.setState({ username: text })} />
                        <FormInput placeholder="Password"autoCapitalize="none" autoCorrect={false} secureTextEntry={true} inputStyle={{width:200}} onChangeText={(text) => this.setState({ password: text })} />
                        <FormInput placeholder="Email" autoCapitalize="none" autoCorrect={false} inputStyle={{width:200}} onChangeText={(text) => this.setState({ email: text })} />
                        {/* <FormInput placeholder="Phone" autoCapitalize="none" autoCorrect={false} inputStyle={{width:200}} onChangeText={(text) => this.setState({ phone_number: text })} /> */}
                        <TextInputMask
                            maxLength={14}
                            value={this.state.raw_phone}
                            onChangeText={res => this.changePhone(res)}
                            placeholder="Phone"
                            ref={ref => this.amountRef = ref}
                            type={'cel-phone'}
                            style={styles.inputText}
                            options={{
                                dddMask: '(999) 999-9999'
                                }}
                        />
                       
                      
                        <Button title='SIGN UP' buttonStyle={styles.signIn} onPress={this.signUp} disabled={!this.state.username || !this.state.password} />
                        <Footer onStateChange={this.changeState} theme={theme} error={this.state.error}></Footer>
                        
                    </View>
                    
                </View>
                
                {/* <ErrorRow theme={theme}>{this.state.error}</ErrorRow> */}
            </KeyboardAvoidingView>

        )
        // return React.createElement(
        //     View,
        //     { style: theme.section },
        //     React.createElement(
        //         Header,
        //         { theme: theme },
        //         I18n.get('Sign Up')
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
        //         React.createElement(Email, {
        //             theme: theme,
        //             onChangeText: text => this.setState({ email: text })
        //         }),
        //         React.createElement(PhoneNumber, {
        //             theme: theme,
        //             onChangeText: text => this.setState({ phone_number: text })
        //         }),
        //         React.createElement(Button, {
        //             title: I18n.get('Sign Up'),
        //             onPress: this.signUp,
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
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
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
        color: 'black',
        fontSize: 30
    },
    plusText: {
        color: 'black',
        fontSize: 30
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signIn: {
        backgroundColor: '#333',
        marginTop: 30,
        borderRadius:25
    },
    footerView: {
        marginTop: 20
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 14
    },
    inputText: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: '#bdc6cf',
        borderBottomWidth: 1,
        width: 200,
        fontSize: 17.78,
        minHeight: 36,
        color: '#86939e'
    }
});