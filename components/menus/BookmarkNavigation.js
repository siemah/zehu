import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Bookmark from '../pages/Bookmark';
import Article from '../pages/Article';

const AppNavigator = createStackNavigator({
  Bookmark: {
    screen: Bookmark,
    path: '/Bookmark/news',
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
    headerBackTitleVisible: false,
  },
  Article: {
    screen: Article,
    path: '/Bookmark/news/:id',
    navigationOptions: {
      header: null,
    }
  }
});

export default createAppContainer(AppNavigator);
