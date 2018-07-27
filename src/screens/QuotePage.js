import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Alert,
  Text,
  View
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
          backgroundColor: '#F9F9F9'
        }}>
          <Text style={{ fontSize: 40 }}>Thank you!</Text>
        </View>

        <View style={{
          flex: 3, 
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor: '#F9F9F9'
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
          backgroundColor: '#F9F9F9'
        }}>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title='OK'
          color='#7C777A' 
        />
        </View>
      </View>
    );
  }
}
