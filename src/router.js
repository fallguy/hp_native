import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { createStackNavigator, TabNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from './screens/Profile';
import Survey from './screens/Survey';


let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    },
  },
  'Survey': {
    screen: Survey,
    navigationOptions: {
      tabBarLabel: 'Explore',
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
          gesturesEnabled: false
        }
      }
    },
  );
};
