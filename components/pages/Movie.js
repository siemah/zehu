import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native'

import HeaderIcon from '../uis/HeaderIcon';
import { Content, Button, Icon, Left, Right, Body, H1, H3, Row, Col, } from 'native-base';
import Axios from 'axios';

const { height, width } = Dimensions.get('screen'); 

const Movie = ({ navigation=null }) => {
  /*let { title, source, id, vote_average, video, overview } = navigation.state.params;
    current movie has: release_date, genres: [{id, name}], production_countries: [{id, name}], release_date, runtime(movies duration)
  */
  
  return (
    <Content style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/images/movies.jpg')} style={styles.movieImage} />
        <View style={styles.overlay} />
        <View style={styles.headerActionsContainer}>
          <HeaderIcon />
        </View>
      </View>
      <View style={styles.contentActionsContainer}>
          <Left>
            <Icon name='md-add' style={styles.iconStyle} />
          </Left>
          <Body>
            <Button style={styles.playiconContainer} transparent onPress={alert}>
              <Icon name='md-play' style={styles.iconStyle} />
            </Button>
          </Body>
          <Right>
            <Icon name='md-share' style={styles.iconStyle} />
          </Right>
      </View>
      <View style={[styles.center,]}>
        <View style={[styles.center]}>
          <H1>Title</H1>
        </View>
        <View style={[styles.center]}>
          <Text>Category, Comedy, Drame</Text>
        </View>
        <View><H1>Rating Component</H1></View>
        <Row style={[styles.row,]}>
          <Col style={[styles.center]}>
            <Text>Rate</Text>
            <H3 style={styles.color}>9/10</H3>
          </Col>
          <Col style={[styles.center,]}>
            <Text>Country</Text>
            <H3 style={styles.color}>USA</H3>
          </Col>
          <Col style={[styles.center,]}>
            <Text>Duration</Text>
            <H3 style={styles.color}>123min</H3>
          </Col>
        </Row>
        <View>
          <Text style={{...styles.color, ...styles.center, padding: 15, }}>
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            Overview of the curren movie, it's kind like a description of this movie
            and talk aboutn scenario and 
          </Text>
        </View>
      </View> 
    </Content>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
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
  },
  contentActionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  playiconContainer: {
    backgroundColor: '#ede6e9',
    height: 70,
    width: 70,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 35,
    elevation: 30,
    overflow: 'hidden',
    alignSelf: 'auto',
  },
  iconStyle: {
    fontSize: 35,
    color: '#0e1636',
  },
  row: {
  },
  color: {
    color: '#0e1636'
  }
});

export default Movie;