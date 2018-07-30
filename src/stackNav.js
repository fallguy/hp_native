import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, TabNavigator, createBottomTabNavigator } from 'react-navigation';
import QuotePage from './screens/QuotePage';
import SliderInput from './screens/SliderInput';
const SimpleStack = createStackNavigator({
    SliderInput: {
      screen: SliderInput,
    },
    QuotePage: {
      path: '/thanks',
      screen: QuotePage,
      navigationOptions: {
        headerLeft: null,
      }
    },
    
  },{
    mode: 'modal',
    headerMode: 'none',
  });   

export default SimpleStack;