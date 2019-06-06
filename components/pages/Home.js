import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, View, Text } from 'native-base';

import HeaderBar from '../uis/HeaderBar'; 
import ScrollThumbnail from '../uis/ScrollThumbnail'; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const Home = (props) => {
  return (
    <Container style={style.container}>
      <HeaderBar iconStyle={style.iconStyle} />
      <ScrollThumbnail />
    </Container>
  )
}

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  circleStyle: {
    position: 'absolute',
    top: -parseInt(SCREEN_WIDTH * 40 / 100),
    right: 0,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH
  },
  iconStyle: { color: 'black', fontSize: 40 },

})

export default Home;
