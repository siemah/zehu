import React, { useReducer, useEffect, useState, } from 'react'
import { StyleSheet, } from 'react-native';
import { Container, Content, Spinner, } from 'native-base';
import axios from "axios";

import HeaderBar from '../uis/HeaderBar';
import MoviesListHorizontal from '../uis/MoviesListHorizontal';
import TitleIcon from '../uis/Title';

import { fetchMoviesAndSeriesReducer, initialState } from '../../store/reducers/movies';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = "28ecfb177a1845471436402e21e6f977";
const popularMoviesUrl = `${apiUrl}/movie/popular?api_key=${apiKey}`;
const popularTvUrl = `${apiUrl}/tv/popular?api_key=${apiKey}`;
const imageUrl = `https://image.tmdb.org/t/p/w300`;
const movieUrl = `${apiUrl}/movie/<movie-id>?api_key=$${apiKey}`;

/**
 * fetch popular movies and series
 * update a state in both cases success and failure
 * return a whole state with refetch function
 */
const useMovies = () => {
  const [state, dispatch] = useReducer(fetchMoviesAndSeriesReducer, initialState);
  const [reload, setReload] = useState(false);
  const source = axios.CancelToken.source();
  const requestToken = source.token;
  /**
   * @name _getPromise
   * return a promise of GET method using axios
   * @see axios package
   * @param {String} link url to endpoint
   * @return Promise 
   */
  const _getPromise = link => axios.get(link);
  /**
   * @name _structureData
   * add a source key with a complete path to image with 30
   * @param {Array} data list of objects contains details of movies/serie
   */
  const _structureData = data => data.length && data.map((elem) =>  ({
    ...elem, source: {
      uri: `${imageUrl}${elem.poster_path}`,
    }
  }));
  let _isMount = true;

  
  useEffect(() => {
    const fetchData = async () => {
      _isMount && dispatch({ type: 'INIT_FETCHING' });
      try {
        let [{ data:movies }, { data:series }] = await axios.all([_getPromise(popularMoviesUrl), _getPromise(popularTvUrl)], { cancelToken: requestToken, });
        movies.results = _structureData(movies.results);
        series.results = _structureData(series.results);
        _isMount && dispatch({ type: 'FULFILLED_GET_MOVIES_AND_SERIES', payload: { series, movies } });
      } catch (error) {
        console.warn(error.message);
        _isMount && dispatch({ type: 'REJECTED_GET_MOVIES', error: error.message})
      }
    };
    fetchData();
    return () => {
      _isMount = false;
      requestToken && source.cancel();
    };
  }, [reload]);

  return [ state, setReload ];
}

const MoviesHome = ({ navigation }) => {
  let { navigate: goTo, toggleDrawer } = navigation;
  const [ data, fetchData ] = useMovies();
  let { loading, movies, series } = data;
  
  return (
    <Container>
      <HeaderBar 
        onPress={toggleDrawer} 
        iconStyle={styles.iconStyle}
       />
      <Content>
        {
          loading 
            ? <Spinner size='large' color='#0e1636' />
            : (
              <>
                <MoviesListHorizontal data={movies.results} />
                <TitleIcon title='Top Movies' icon="md-arrow-forward" iconStyle={styles.iconStyle} />
                <MoviesListHorizontal cardImageContainerStyle={styles.smallCard} data={movies.results} />
                <TitleIcon title='Top Series' icon="md-arrow-forward" iconStyle={styles.iconStyle} />
                <MoviesListHorizontal cardImageContainerStyle={styles.smallCard} data={series.results} />
              </>
            )
        }
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
