/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { Container } from 'native-base';

//import Splash from './components/pages/Splash';
import MainDrawerNavigator from './components/menus/MainDrawerNavigator';


export default class App extends Component {

  render() {
    return (
      <Container>
        <MainDrawerNavigator />
      </Container>
    );
  }
}
