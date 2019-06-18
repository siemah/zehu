import React, { useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert
} from 'react-native';

import HeaderBar from '../uis/HeaderBar';
import VerticalCard from '../uis/VerticalCard';

import { fetchArticlesReducer } from '../../store/reducers/articles';
import { getListOfSavedArticles, saveUserLocation } from '../../utils/tools';

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
    console.warn(data.articles.length);
    
    const _isMount = true;
    // check if the user has a geolocation permission enabled
      // then if yes will try to retrieve a current location
      // else display a popup to enable a location where Android >= 6
    const checkLocationPermission = async () => {
      try {
        let locationIsEnabled = await PermissionsAndroid.check("android.permission.ACCESS_FINE_LOCATION");
        if(locationIsEnabled) {
          let response = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
          if(response === 'granted') {
            navigator.geolocation.getCurrentPosition(
              async ({ coords, timestamp}) => {
                let isSaved = await saveUserLocation({ coords, timestamp });
                if( typeof isSaved === 'string' ) Alert.alert(
                  'Failed to save your location details',
                  isSaved,
                  [
                    { text: 'Yes, I know', style: 'cancel'},
                    { text: 'Try again', style: 'destructive' },
                    { text: 'Later', style: 'default' }
                  ],
                  {
                    cancelable: false,
                  }
                )
              },
              err => { 
                throw new Error (err);
              }
            );
          }
          
        }
      } catch (error) {
        console.warn("error ", error.message);
      }
    }
    checkLocationPermission();

    if (_isMount) dispatch({ type: 'INIT_GET_ARTICLES' });
    let getArticles = async () => {
      let articles = await getListOfSavedArticles();
      if (articles.length && _isMount)
        dispatch({ type: 'FULFILLED_GET_ARTICLES', payload: articles });
      else if(_isMount )
        dispatch({ type: 'REJECTED_GET_ARTICLES', payload: 'You don\'t have save any articles' });
    }
    getArticles();
    // cleanup the fetching from asyncstorage articles
    return () => _isMount = false;
  }, [data.articles.length]);
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
