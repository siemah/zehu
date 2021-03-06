import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Container, } from 'native-base';
import axios from 'axios';

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';
import AlertMessage from '../uis/AlertMessage';

import Article from './Article';

import { fetchArticlesReducer } from '../../store/reducers/articles';
import { apiKey, apiURL } from '../../assets/files/config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const initialState = {
  articles: null,
  loading: false,
  message: null,
};

const useArticles = () => {

  const [state, dispatch] = useReducer(fetchArticlesReducer, initialState);
  const [category,  setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [toggleLoad, setToggleLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const source = axios.CancelToken.source();
  const requestToken = source.token;
  let _isMounted = true;

  useEffect(() => {
    //console.warn('loading source.token :)');
    const fetchDate = () => {
      // dispatch loading state
      if (_isMounted) {
        dispatch({ type: 'INIT_GET_ARTICLES' });
        setRefreshing(true);
      }
      axios.get(
        `https://api.recsys.opera.com/api/1.0/suggestions/list?count=50&language=en${search? '&search=' + search : ''}${category ? '&category='+category : ''}`,
        { cancelToken: requestToken, }
      )
      .then(res => {
        let { articles } = res.data;
        if (articles.length && _isMounted){
          setRefreshing(false);
          dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
        }
        else throw new Error('Something went wrong, check Wifi or your Data.');
      })
      .catch((error) => {
        console.warn('error --> ', error)
        if (_isMounted) { 
          setRefreshing(false);
          dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
        }
      })
    }
    fetchDate();
    return function cancel() {
      _isMounted = false;
      source.token && source.cancel();
    }
  }, [ category, toggleLoad, search ]);
  return [ { data: state, toggleLoad, refreshing }, setCategory, setToggleLoad, setSearch];
}

const Home = (props) => {

  const { navigate: goTo, toggleDrawer } = props.navigation;
  const [{ data: state, toggleLoad, refreshing }, fetchArticles, reloadArticles, searchFor ] = useArticles();
  /**
   * @name _onChangeCategory
   * change the category
   * @param {String} category
   */
  const _onChangeCategory = category => {
    if(!state.loading) fetchArticles(category);
  }
  /**
   * @name _onRefetch
   * try to refetch new articles when user has
   * been offline or some trouble on connexion
   */
  const _onRefetch = () => reloadArticles(!toggleLoad);
  
  return (
    <Container style={style.container}>
      <HeaderBar onPress={toggleDrawer} onSubmit={searchFor} iconStyle={style.iconStyle} />
      {
        state.message
          ? <AlertMessage message={state.message} onPress={_onRefetch} />
          : (
            <ScrollView 
              refreshControl={
                <RefreshControl 
                  refreshing={state.articles !== null && refreshing}
                  color="#0e1636"
                  onRefresh={_onRefetch}
                />
              } >
              <VerticalCard data={state} goTo={goTo} onPress={_onChangeCategory} />
            </ScrollView>
          )
      }
    </Container>
  );

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
  iconStyle: {
    fontSize: 40
  },

})

export default Home;
