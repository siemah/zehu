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
//import Fetch from './components/pages/Fetch';

//import NewsContext, { newsContextState } from './store/context/news'; 

const App = () => {
  return (
    <Container>
      <MainDrawerNavigator />
    </Container>
  );
},

export default App;