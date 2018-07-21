import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { createStackNavigator, TabNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Survey from './screens/Survey';
import Map from './screens/Map';
import SliderInput from './screens/SliderInput';
import QuotePage from './screens/QuotePage';
import SimpleStack from './stackNav';

let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
  'Home': {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    },
  },
//  'Profile': {
//    screen: Profile,
//    navigationOptions: {
//      tabBarLabel: 'Profile',
//      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
//    },
//  },
  'Survey': {
    screen: SimpleStack, // TODO: change this back to Survey after updating that screen
    navigationOptions: {
      tabBarLabel: 'Take Survey!',
      tabBarIcon: ({ tintColor }) => <Icon reverse name="ios-hand" type="ionicon" size={28} color="skyblue" />
    },
  },
//  'SliderInput': {
//    screen: SimpleStack,
//    navigationOptions: {
//      tabBarLabel: 'SliderInput',
//      tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
//    },
//  },
  'Map': {
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
});

export const createRootNavigator = () => {
  return createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          title: 'Happy Place :)',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: 'skyblue',
          },
        }
      },
      Profile: { 
        screen: Profile,
        navigationOptions: {
          title: 'Profile',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: 'steelblue',
          },
        }
      },
    },
  );
};
