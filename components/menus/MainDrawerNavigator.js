import React from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import BookmarkNavigator from './BookmarkNavigation';
import NewsNavigator from './NewsNavigation';

const DrawerNavigator = createDrawerNavigator({
  'News Bookmark': {
    screen: BookmarkNavigator
  },
  News: {
    screen: NewsNavigator
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
