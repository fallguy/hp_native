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
      backgroundColor: '#495875',
    },
    inactiveTintColor: '#A8EDE3',
    activeTintColor: '#7C777A',
    showLabel: false,
  },
});

// #D1F1D9 tea green
// #495875 dark blueish purple
// #F9F9F9 off white
// #A8EDE3 pale turquoise
// #7C777A silvery brown

export const createRootNavigator = () => {
  return createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          title: 'Alpha State',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: '#D1F1D9',
          },
        }
      },
      Profile: { 
        screen: Profile,
        navigationOptions: {
          title: 'Profile',
          gesturesEnabled: false,
          headerStyle: {
            backgroundColor: '#D1F1D9',
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
            backgroundColor: '#D1F1D9',
          },
        },
      }
    },
  );
};
