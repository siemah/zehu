import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, } from 'native-base';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';
import AlertMessage from '../uis/AlertMessage';

import { apiKey, apiURL } from '../../assets/files/config';
import Article from './Article';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const initialState = {
  articles: [],
  loading: false,
  message: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_GET_ARTICLES':
      return { ...state, loading: true, message: null };
    case 'FULFILLED_GET_ARTICLES':
      return { ...state, message: null, loading: false, articles: payload }
    case 'REJECTED_GET_ARTICLES':
      return { ...state, loading: false, message: payload }
    default:
      return state
  }
}

const useArticles = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [category,  setCategory] = useState(null);
  const [toggleLoad, setToggleLoad] = useState(false);
  const source = axios.CancelToken.source();
  const requestToken = source.token;
  let _isMounted = true;

  useEffect(() => {
    //console.warn('loading source.token :)');
    const fetchDate = () => {
      // dispatch loading state
      if (_isMounted) dispatch({ type: 'INIT_GET_ARTICLES' });
      axios.get(
        `https://api.recsys.opera.com/api/1.0/suggestions/list?count=50&language=en${category ? '&category='+category : ''}`,
        { cancelToken: requestToken, }
      )
      .then(res => {
        let { articles } = res.data
        if (articles.length && _isMounted)
          dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
        else throw new Error('Something went wrong, check Wifi or your Data.');
      })
      .catch((error) => {
        console.warn('error --> ', error)
        if (_isMounted) dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
      })
    }
    fetchDate();
    return function cancel() {
      _isMounted = false;
      source.token && source.cancel();
    }
  }, [ category, toggleLoad ]);
  return [ { data: state, toggleLoad }, setCategory, setToggleLoad];
}

const Home = (props) => {

  const { navigate: goTo, } = props.navigation;
  const [ { data: state, toggleLoad }, fetchArticles, reloadArticles ] = useArticles();
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
      <HeaderBar iconStyle={style.iconStyle} />
      {
        state.message
          ? <AlertMessage message={state.message} onPress={_onRefetch} />
          : (
            <ScrollView>
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

const AppNavigator = createStackNavigator({
  News: {
    screen: Home,
    path: '/news/default',
    navigationOptions: ({ navigation }) => ({
      title: `Bom's Profile'`,
      header: null,
    }),
    headerBackTitleVisible: false,
  },
  Article: {
    screen: Article,
    path: '/news/article/:url',
    navigationOptions: {
      header: null,
    }
  }
});

export default createAppContainer(AppNavigator);

//export default Home;
