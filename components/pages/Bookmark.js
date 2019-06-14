import React, { useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';

import { fetchArticlesReducer } from '../../store/reducers/articles';
import { getListOfSavedArticles } from '../../utils/tools';

const initialState = {
  loading: false,
  articles: [],
  message: null,
}

/**
 * @author siemah
 * @version 1.0.0
 * @name Bookmark
 * Render a list of articles saved on phone
 * @param {Object} props list herited or passed from React.Component or parent
 * @return React.Component
 */
const Bookmark = ({ navigation }) => {
  const { toggleDrawer } = navigation;
  
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
      <HeaderBar onPress={toggleDrawer} />
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
