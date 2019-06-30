import { createStackNavigator, createAppContainer } from "react-navigation";

import MoviesHome from '../pages/MoviesHome';
//import Article from '../pages/Article';

const AppNavigator = createStackNavigator({
  Movies: {
    screen: MoviesHome,
    path: '/movies/home',
    navigationOptions: {
      header: null,
    },
    headerBackTitleVisible: false,
  },/*
  Article: {
    screen: Article,
    path: '/news/article/:url',
    navigationOptions: {
      header: null,
    }
  }*/
});

export default createAppContainer(AppNavigator);