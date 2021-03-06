import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Alert,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
var quotedata = require('./quotes.js');
var quotes = quotedata.quotes;

export default class QuotePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      randQuote: [],
      randAuth: []
    };
  }

  componentWillMount() {
    var newRand = Math.floor(Math.random() * quotes.length);
    var rand = quotes[newRand];
    this.setState({
      randQuote: rand.quote
    });
    this.setState({
      randAuth: rand.author
    });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
      key: null
    });
    const didBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.props.navigation.dispatch(resetAction);
      }
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{
          flex: 2, 
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor: '#f1ece7'
        }}>
          <Text style={{ fontSize: 40 }}>Thank you!</Text>
        </View>
        <View style={{
          flex: 3, 
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor: '#f1ece7'
        }}>
          <Text style={{ margin: 30, fontSize: 24, fontStyle: 'italic' }}>
            "{this.state.randQuote}"
          </Text>
          <Text style={{ fontSize: 20, margin: 30 }}>
            -- {this.state.randAuth}
          </Text>
        </View>
        <View style={{flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#f1ece7'
        }}>
        <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('Home')}
          style={{ 
            width: '50%',
            padding: 6,
            backgroundColor: '#f39558',
            borderRadius: 15,
          }}
        >
          <Text style={{
            fontSize: 14,
            color: 'white',
            alignSelf: 'stretch',
            textAlign: 'center',
          }}>OK</Text>
        </TouchableHighlight>      
        </View>
      </View>
    );
  }
}
