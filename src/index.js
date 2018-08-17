'use strict';
import Expo from 'expo';
import App from './App';
import React, { Component } from 'react';
import { View } from 'react-native';
//import 'semantic-ui-css/semantic.min.css';

if (process.env.NODE_ENV === 'development') {
  Expo.KeepAwake.activate();
}

Expo.registerRootComponent(App);

//# sourceMappingURL=crna-entry.js.map
