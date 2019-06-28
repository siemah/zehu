import React from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';

import HeaderBar from '../uis/HeaderBar';
import { Container, Content, Card, CardItem } from 'native-base';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = "28ecfb177a1845471436402e21e6f977";
const popularMoviesUrl = `${apiUrl}/movie/popular?api_key=$${apiKey}`;
const popularTvUrl = `${apiUrl}/tv/popular?api_key=$${apiKey}`;
const imageUrl = `https://image.tmdb.org/t/p/w500/<image-path>`
const movieUrl = `${apiUrl}/movie/<movie-id>?api_key=$${apiKey}`;

const MoviesHome = ({ navigation }) => {
  let { navigate: goTo, toggleDrawer } = navigation;

  return (
    <Container>
      <HeaderBar 
        onPress={toggleDrawer} 
        iconStyle={styles.iconStyle}
       />
      <Content>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <Card style={styles.card} transparent>
            <CardItem style={styles.moviePosterContainer} cardBody>
              <ImageBackground source={require('../../assets/images/movies.jpg')} style={styles.moviePoster} />
            </CardItem>
          </Card>
          <Card style={styles.card} transparent>
            <CardItem style={styles.moviePosterContainer} cardBody>
              <ImageBackground source={require('../../assets/images/movies.jpg')} style={styles.moviePoster} />
            </CardItem>
          </Card>
          <Card style={styles.card} transparent>
            <CardItem style={styles.moviePosterContainer} cardBody>
              <ImageBackground source={require('../../assets/images/movies.jpg')} style={styles.moviePoster} />
            </CardItem>
          </Card>
        </ScrollView>
      </Content>
    </Container>
  )
}


const styles = StyleSheet.create({
  iconStyle: {
    color: '#0e1636',
    fontSize: 40,
  },
  card: {
    overflow: 'hidden',
  },
  moviePosterContainer: {
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 15,
    flex: 1,
    borderRadius: 10,
    height: 200,
    width: 250,
    elevation: 10,
  },
  moviePoster: {
    height: '100%', 
    width: '100%',
    resizeMode: 'cover',
  }
})

export default MoviesHome;