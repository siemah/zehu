import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, } from 'native-base';
import axios from 'axios';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';

import { apiKey, apiURL } from '../../assets/files/config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const initialState = {
  articles: [],
  loading: false,
  message: null,
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_GET_ARTICLES':
      return { ...state, loading: true };
    case 'FULFILLED_GET_ARTICLES':
      return { ...state, loading: false, articles: payload }
    case 'REJECTED_GET_ARTICLES':
      return { ...state, loading: false, message: payload }
    default:
      return state;
  }
}

const Home = (props) => {
  const apiLink = `${apiURL}?apiKey=${apiKey}&language=en&pageSize=100`
  const goTo = path => props.navigation.navigate(path);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  let _isMounted = true;

  const [data, dispatch] = useReducer(newsReducer, initialState);
  const [url, setUrl] = useState(apiLink);

  useEffect(() => {
    const fetchDate = async () => {
      // dispatch loading data
      dispatch({ type: 'INIT_GET_ARTICLES' });
      //console.warn("[fetch]");
      try {
        let { data } = await axios.get(`${url}`, {cancelToken: source.token});
        //console.warn("status %s, number of articles: %d", data.status, data.articles.length);
        if(data.status==='ok' && _isMounted)
          dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: data.articles });
        else if(_isMounted)
          dispatch({ type: 'REJECTED_GET_ARTICLES', payload: 'Try again' });
      } catch (error) {
        console.warn(error);
        if(_isMounted)
          dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
      }
    }
    fetchDate();
    return function cancel() {
      _isMounted = false;
      source.cancel();
    }
  }, [url]);

  return (
    <Container style={style.container}>
      <HeaderBar iconStyle={style.iconStyle} />
      <ScrollView>
        <VerticalCard data={data} goTo={goTo} />
      </ScrollView>
    </Container>
  )
}

const Second = () => (
  <HeaderBar iconStyle={style.iconStyle} />
)

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
  Second: {
    screen: Second,
    path: '/second',
  }
});

export default createAppContainer(AppNavigator);

//export default Home;
