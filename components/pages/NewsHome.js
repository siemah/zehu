import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, } from 'native-base';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';

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
  const [state, setState] = useState(initialState);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  let _isMounted = true;

  const params = `apiKey=${apiKey}&language=fr&pageSize=100&category=`;

  useEffect(() => {
    const fetchDate = async () => {
      // dispatch loading state
      if (_isMounted) setState({ loading: true });
      try {
        let { status, articles } = await axios.get(`${apiURL}?${params}`, { cancelToken: source.token }).then(res => res.data);
        if (status === 'ok' && _isMounted) {
          setState({ loading: false, articles });
        }
        else throw new Error('Try again :(');
      } catch (error) {
        if (_isMounted) setState({ loading: true });
      }
    }
    fetchDate();
    return function cancel() {
      _isMounted = false;
      source.cancel();
    }
  }, []);

  const goTo = props.navigation.navigate;

  return (
    <Container style={style.container}>
      <HeaderBar iconStyle={style.iconStyle} />
      <ScrollView>
        <VerticalCard data={state} goTo={goTo} />
      </ScrollView>
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
