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
import {StyleSheet, Dimensions} from 'react-native'
import { Auth, Logger } from 'aws-amplify';

import AmplifyTheme from 'aws-amplify-react-native';
import AmplifyMessageMap from './AmplifyMessageMap';
const logger = new Logger('AuthPiece');
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export default class AuthPiece extends React.Component {
    constructor(props) {
        super(props);

        this._isHidden = true;
        this._validAuthStates = [];
        this.changeState = this.changeState.bind(this);
        this.error = this.error.bind(this);
    }

    changeState(state, data) {
        if (this.props.onStateChange) {
            this.props.onStateChange(state, data);
        }
    }

    error(err) {
        logger.debug(err);
        console.log(err)
        let msg = '';
        if (typeof err === 'string') {
            msg = err;
        } else if (err.message) {
            msg = err.message;
        } else {
            msg = JSON.stringify(err);
        }
        console.log('e', AmplifyMessageMap)

        const map = this.props.errorMessage || AmplifyMessageMap;
        msg = typeof map === 'string' ? map : map(msg);
        this.setState({ error: msg });
    }

    render() {
        if (!this._validAuthStates.includes(this.props.authState)) {
            this._isHidden = true;
            return null;
        }

        if (this._isHidden) {
            const { track } = this.props;
            if (track) track();
        }
        this._isHidden = false;
        console.log(styles)
        return this.showComponent(styles || AmplifyTheme);
    }

    showComponent(theme) {
        throw 'You must implement showComponent(theme) and don\'t forget to set this._validAuthStates.';
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
      backgroundColor: "transparent",
      width: 250,
      height: 450
    },
    loginTitle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    travelText: {
      color: "#FAFAFA",
      fontSize: 30
    },
    plusText: {
      color: "#FAFAFA",
      fontSize: 30
    },
    loginInput: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    signIn: {
      backgroundColor: "#FFF",
      marginTop: 30,
      borderRadius: 25
    },
    welcomeText: {
      textAlign: "center",
      fontSize: 14,
      color: "#FAFAFA"
    },
    footerView: {
      marginTop: 20
    },
    inputText: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: "#bdc6cf",
        borderBottomWidth: 1,
        width: 200,
        fontSize: 17.78,
        minHeight: 36,
        color: "#FAFAFA"
      },
    inputStyle: {
      color: "#FAFAFA",
      width: 200
    },
    link: { fontSize: 14, color: "#ADD8E6", textAlign: "center" }
  });
  