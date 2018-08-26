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
import { View, Text, TextInput, TouchableHighlight,StyleSheet } from 'react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements'
import AmplifyTheme from 'aws-amplify-react-native';
import { Username, ConfirmationCode, LinkCell, Header, ErrorRow } from 'aws-amplify-react-native';
import AuthPiece from './AuthPiece';

const logger = new Logger('SignIn');

const Footer = props => {
    const { theme, onStateChange, error } = props;
  
    return (
        <View style={styles.footerView}>
            
            <Text style={{fontSize:14,color: '#007bff', textAlign: 'center'}} onPress={() => onStateChange('signIn')}>Back to Sign In</Text>
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

export default class ConfirmSignUp extends AuthPiece{
    constructor(props) {
        super(props);

        this._validAuthStates = ['confirmSignUp'];
        this.state = {
            username: null,
            code: null,
            error: null
        };

        this.confirm = this.confirm.bind(this);
        this.resend = this.resend.bind(this);
    }

    confirm() {
        const { username, code } = this.state;
        logger.debug('Confirm Sign Up for ' + username);
        Auth.confirmSignUp(username, code).then(data => this.changeState('signedUp',username)).catch(err => this.error(err));
    }

    resend() {
        const { username } = this.state;
        logger.debug('Resend Sign Up for ' + username);
        Auth.resendSignUp(username).then(() => logger.debug('code sent')).catch(err => this.error(err));
    }

    componentWillReceiveProps(nextProps) {
        const username = nextProps.authData;
        console.log(nextProps);
        if (username && !this.state.username) {
            this.setState({ username });
        }
    }

    showComponent(theme) {
        return (
            <View style={styles.bgImage}>
                <View style={styles.loginView}>
                    <View style={styles.loginTitle}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.travelText}>CONFIRM SIGN UP</Text>

                        </View>
                    </View>
                    <View style={styles.loginInput}>

                        <FormInput placeholder="Code" autoCapitalize="none" autoCorrect={false}  inputStyle={{width:200}} onChangeText={(text) => this.setState({ code: text })} />
                    
                      
                        <Button title='CONFIRM' buttonStyle={styles.signIn} onPress={this.confirm} disabled={!this.state.code} />
                        <Footer onStateChange={this.changeState} theme={theme} error={this.state.error}></Footer>
                        
                    </View>
                    
                </View>
                
                {/* <ErrorRow theme={theme}>{this.state.error}</ErrorRow> */}
            </View>

        )
        // return React.createElement(
        //     View,
        //     { style: theme.section },
        //     React.createElement(
        //         Header,
        //         { theme: theme },
        //         I18n.get('Confirm Sign Up')
        //     ),
        //     React.createElement(
        //         View,
        //         { style: theme.sectionBody },
        //         React.createElement(Username, {
        //             theme: theme,
        //             value: this.state.username,
        //             onChangeText: text => this.setState({ username: text })
        //         }),
        //         React.createElement(ConfirmationCode, {
        //             theme: theme,
        //             onChangeText: text => this.setState({ code: text })
        //         }),
        //         React.createElement(Button, {
        //             title: I18n.get('Confirm'),
        //             onPress: this.confirm,
        //             disabled: !this.state.username || !this.state.code
        //         }),
        //         React.createElement(Button, {
        //             title: I18n.get('Resend a Code'),
        //             onPress: this.resend,
        //             disabled: !this.state.username
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
        fontSize: 30,
        textAlign:'center'
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
    }
});