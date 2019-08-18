import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import BookmarkNavigator from './BookmarkNavigation';
import NewsNavigator from './NewsNavigation';
//import Fetch from '../pages/Fetch';
//import Login from '../pages/Login';
import MoviesNavigator from './MoviesNavigator';
import { Icon } from 'native-base';

const DrawerNavigator = createDrawerNavigator({
  News: {
    screen: NewsNavigator,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (<Icon name='md-paper' style={{ color: tintColor, fontSize: 30, }} />)
    },
  },
  MoviesNavigator: {
    screen: MoviesNavigator,
    navigationOptions: {
      drawerLabel: 'Movies & Series',
      drawerIcon: ({ tintColor }) => (<Icon name='md-film' style={{ color: tintColor, fontSize: 30, }} />)
    },
  },
  'News Bookmark': {
    screen: BookmarkNavigator,
    navigationOptions: {
      drawerLabel: 'Bookmark',
      drawerIcon: ({ tintColor}) => (<Icon name='md-archive' style={{ color: tintColor, fontSize: 30, }} />)
    },
  },
}, {
  drawerBackgroundColor: '#0e1636',
  drawerType: 'slide',
  hideStatusBar: false,
  contentOptions: {
    itemsContainerStyle: {
      marginTop: 20
    },
    inactiveTintColor: 'white',
    activeTintColor: '#0e1636',
    activeBackgroundColor: 'white',
  },
});

export default createAppContainer(DrawerNavigator);
