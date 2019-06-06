import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Content, Container } from 'native-base';

import HeaderBar from '../uis/HeaderBar'; 
import Circle from '../uis/Circle'; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const Home = (props) => {
  return (
    <Container style={style.container}>
      <Circle circleStyle={style.circleStyle} />
      <HeaderBar 
        iconStyle={style.iconStyle} 
      />
    
    </Container>
  )
}

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  circleStyle: {
    position: 'absolute',
    top: -parseInt(SCREEN_WIDTH * 40 / 100),
    right: 0,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH
  },
  iconStyle: { color: 'black' },

})

export default Home;
