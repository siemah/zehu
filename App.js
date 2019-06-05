/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content, Footer } from 'native-base';

import Splash from './components/pages/Splash';

export default class App extends Component{
  render() {
    return (
      <Container>
        <Content>
          <Splash />
        </Content>
      </Container>
    );
  }
}

