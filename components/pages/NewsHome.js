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
      return { ...state, loading: true };
    case 'FULFILLED_GET_ARTICLES':
      return { ...state, loading: false, articles: payload }
    case 'REJECTED_GET_ARTICLES':
      return { ...state, loading: false, message: payload }
    default:
      return state
  }
}

const Home = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [category,  setCategory] = useState('');
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  let _isMounted = true;

  useEffect(() => {
    console.warn('UI');
    const fetchDate = () => {
      // dispatch loading state
      if (_isMounted) dispatch({ type: 'INIT_GET_ARTICLES' });
      axios.get(
        `${apiURL}?apiKey=${apiKey}&language=en&pageSize=100${category.length ? '&' + category : ''}`,
        { cancelToken: source.token, }
      )
      .then(res => {
        let { status, articles } = res.data
        console.warn('fetching articles ', articles);
        if (status === 'ok' && _isMounted)
          dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
        else throw new Error('Something went wrong, check Wifi or your Data.');
      })
      .catch((error) => {
        console.warn('error --> ', error.message)
        if (_isMounted) dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
      })
    }
    fetchDate();
    return function cancel() {
      _isMounted = false;
      source.cancel();
    }
  }, [category]);

  const { navigate: goTo, } = props.navigation;
  /**
   * @name _onChangeCategory
   * change the category
   * @param {String} category
   */
  const _onChangeCategory = category => {
    if(!state.loading) {
      setCategory(category);
    }
  }
  const _onRefresh = () => {
    console.warn("onRefresh ", category);
    setCategory(category);
  }

  return (
    <Container style={style.container}>
      <HeaderBar iconStyle={style.iconStyle} />
      {
        state.message
          ? <AlertMessage message={state.message} onPress={_onRefresh} />
          : (
            <ScrollView>
              <VerticalCard data={state} goTo={goTo} onPress={_onChangeCategory} />
            </ScrollView>
          )
      }
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
