import React, { Component } from 'react'
import { StyleSheet, View, Animated, Image } from 'react-native'
import { Container, Content } from 'native-base';

import splashStyle from '../../assets/styles/splash';
console.warn("object", splashStyle.center)

const Splash = props => (
  <Container>
    <View style={[ StyleSheet.absoluteFillObject, splashStyle.center ]}>
      <Image source={require('../../assets/images/logo-150x150.png')} style={splashStyle.brandLogo} />
    </View>
  </Container>
) 

export default Splash;