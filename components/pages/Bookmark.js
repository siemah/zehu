import React, { useEffect, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Article from './Article';
import VerticalCard from '../uis/VerticalCard';

import { fetchArticlesReducer } from '../../store/reducers/articles';
import { getListOfSavedArticles } from '../../utils/tools';

const initialState = {
  loading: false,
  articles: [],
  message: null,
}

const Bookmark = ({ navigation }) => {
  const [data, dispatch] = useReducer(fetchArticlesReducer, initialState);
  useEffect(() => {
    dispatch({ type: 'INIT_GET_ARTICLES' });
    let getArticles = async () => {
      let articles = await getListOfSavedArticles();
      if(articles.length)
        dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
      else
        dispatch({ type: 'REJECTED_GET_ARTICLES', payload: 'You don\'t have save any articles' });
    }
    getArticles();
  }, []);
  return (
    <View style={styles.container}>
      <Text>I'm the Bookmark component {data.articles.length}</Text>
      <VerticalCard data={data} goTo={navigation.navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default  Bookmark;
