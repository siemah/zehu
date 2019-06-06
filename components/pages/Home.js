import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Container, } from 'native-base';

import HeaderBar from '../uis/HeaderBar'; 
import VerticalCard from '../uis/VerticalCard'; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const initialState = {
  articles: [],
  loading: false,
  message: null,
};
const reducer = (state = initialState, { type, payload }) => {
  console.warn(type, payload);
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
  const fetchDate = async () => {
    // dispatch loading state
    dispatch({ type: 'INIT_GET_ARTICLES' });
    try {
      let res = await fetch('http://arabicpost.net/wp-json/wp/v2/posts');
      let articles = await res.json();
      //console.warn("state", state);
      dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
    } catch (error) {
      dispatch({ type: 'REJECTED_GET_ARTICLES', payload: error.message });
    }
  }
  useEffect(() => {
    fetchDate();
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
