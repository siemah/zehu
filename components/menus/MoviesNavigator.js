import { createStackNavigator, createAppContainer } from "react-navigation";

import MoviesHome from '../pages/MoviesHome';
import Movie from '../pages/Movie';

const AppNavigator = createStackNavigator({
  Movies: {
    screen: MoviesHome,
    path: '/movies/home',
    navigationOptions: {
      header: null,
    },
    headerBackTitleVisible: false,
  },
  Movie: {
    screen: Movie,
    path: '/movies/:id',
    navigationOptions: {
      header: null,
    }
  }
});

export default createAppContainer(AppNavigator);