/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content } from 'native-base';

import Splash from './components/pages/Splash';
import NewsHome from './components/pages/NewsHome';

export default class App extends Component{
  render() {
    return (
      <Container>
        <NewsHome />
      </Container>
    );
  }
}
