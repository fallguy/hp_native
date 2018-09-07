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
  'Survey': {
    screen: SliderInput, // TODO: change this back to Survey after updating that screen
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon reverse name="create" size={28} color={tintColor} />,
    },
    tabBarOptions: {
      showLabel: false,
    }
  },
  'Map': {
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#8c4219',
    },
    inactiveTintColor: '#f39558',
    activeTintColor: '#eec8b0',
    showLabel: false,
  },
});

// #4AB0DB robin egg blue
// #A67D23 toasty brown
// #925E29 coconut brown
// #0972C9 sky blue
// #4A5933 mossy green
//
// #8c4219 dark brown
// #f39558 tan
// #eec8b0 beige
// #f1ece7 eggshell white
// #a5bd97 teal

export const createRootNavigator = () => {
  return createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          title: 'Alpha State',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: '#a5bd97',
          },
        }
      },
      Profile: { 
        screen: Profile,
        navigationOptions: {
          title: 'Profile',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: '#a5bd97',
          },
        }
      },
      QuotePage: {
        path: '/thanks',
        screen: QuotePage,
        navigationOptions: {
          title: 'Alpha State',
          headerLeft: null,
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: '#a5bd97',
          },
        },
      }
    },
  );
};
