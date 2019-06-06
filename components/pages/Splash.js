import React, { Component } from 'react'
import { StyleSheet, View, Animated, Image } from 'react-native'
import { Container, Content } from 'native-base';

import splashStyle from '../../assets/styles/splash';

/**
 * Splash screen
 * @author siemah
 * @version 1.0.0
 * @param {Object} props contain a list of propreties
 */
const Splash = props => (
  <Container>
    <View style={[ StyleSheet.absoluteFillObject, splashStyle.center ]}>
      <Image source={require('../../assets/images/logo-150x150.png')} style={splashStyle.brandLogo} />
    </View>
  </Container>
) 

export default Splash;