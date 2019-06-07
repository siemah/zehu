import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, } from 'native-base';
import axios from 'axios';

import HeaderBar from '../uis/HeaderBar'; 
import VerticalCard from '../uis/VerticalCard';

import { apiURL, apiKey } from '../../assets/files/config.json';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

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
  const source = axios.CancelToken.source();

  const fetchDate = async () => {
    // dispatch loading state
    dispatch({ type: 'INIT_GET_ARTICLES' });
    try {
      let { status, articles } = await axios.get(`${apiURL}?language=en&apiKey=${apiKey}`, { cancelToken: source.token }).then(r=> r.data);
      if (status === "ok" ) dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
      else{console.warn(status); throw new Error('Try again :(');}
    } catch (error) {
      dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
      console.warn(`error: ${error.message}`)
    }
  }
  useEffect(() => {
    fetchDate();
    return function cleanUp(){
      source.cancel("cancelation ..");
    }
  }, []);
  return (
    <Container style={style.container}>
      <HeaderBar iconStyle={style.iconStyle} />
      <ScrollView>
        <VerticalCard data={state} />
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

export default Home;
