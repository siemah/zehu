import React from 'react'
import { View, Text, ScrollView, StyleSheet, } from 'react-native';

import HeaderBar from '../uis/HeaderBar';
import { Container, Content, } from 'native-base';

import CardImage from '../uis/CardImage'
import MoviesListHorizontal from '../uis/MoviesListHorizontal';
import TitleIcon from '../uis/Title';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = "28ecfb177a1845471436402e21e6f977";
const popularMoviesUrl = `${apiUrl}/movie/popular?api_key=$${apiKey}`;
const popularTvUrl = `${apiUrl}/tv/popular?api_key=$${apiKey}`;
const imageUrl = `https://image.tmdb.org/t/p/w500/<image-path>`
const movieUrl = `${apiUrl}/movie/<movie-id>?api_key=$${apiKey}`;

const MoviesHome = ({ navigation }) => {
  let { navigate: goTo, toggleDrawer } = navigation;
  const moviesList = [
    {
      id: 1,
      title: 'Some fucking title',
      source: require('../../assets/images/movies.jpg'),
    },
    {
      id: 11,
      title: null,
      source: require('../../assets/images/movies.jpg'),
    },
    {
      id: 111,
      title: null,
      source: require('../../assets/images/movies.jpg'),
    },
    {
      id: 1222,
      title: null,
      source: require('../../assets/images/movies.jpg'),
    },
    {
      id: 551,
      title: null,
      source: require('../../assets/images/movies.jpg'),
    },
    {
      id: 556561,
      title: null,
      source: require('../../assets/images/movies.jpg'),
    },
  ];
  console.warn("sss ..");

  return (
    <Container>
      <HeaderBar 
        onPress={toggleDrawer} 
        iconStyle={styles.iconStyle}
       />
      <Content>
        <MoviesListHorizontal data={moviesList} />
        <TitleIcon title='Top Movies' icon="md-arrow-forward" iconStyle={styles.iconStyle} />
        <MoviesListHorizontal cardImageContainerStyle={styles.smallCard} data={moviesList} />
        <TitleIcon title='Top Series' icon="md-arrow-forward" iconStyle={styles.iconStyle} />
        <MoviesListHorizontal cardImageContainerStyle={styles.smallCard} data={moviesList} />
      </Content>
    </Container>
  )
}


const styles = StyleSheet.create({
  iconStyle: {
    color: '#0e1636',
    fontSize: 40,
  },
  smallCard: {
    width: 120,
    height: 150,
    marginHorizontal: 5,
    elevation: 5, 
  }
})

export default MoviesHome;
