import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native'

import HeaderIcon from '../uis/HeaderIcon';

const { height, width } = Dimensions.get('screen');  

const Movie = ({ navigation=null }) => {
  //let { title, source, id, } = navigation.state.params;
  //console.warn(source, id);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/images/movies.jpg')} style={styles.movieImage} />
        <View style={styles.overlay} />
        <View style={styles.headerActionsContainer}>
          <HeaderIcon />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginTop: 25,
  },
  headerContainer: {
    position: 'relative',
    elevation: 30,
    overflow: 'hidden',
    height: height * 0.45, 
    borderBottomRightRadius: width/3.5,
    borderBottomLeftRadius: width/3.5,
  },
  movieImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: { 
    ...StyleSheet.absoluteFill, 
    backgroundColor: 'rgba(0, 0, 0, 0.19)',
  },
  headerActionsContainer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 60, 
    width: '100%',
  }
});

export default Movie;