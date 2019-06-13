import { createStackNavigator, createAppContainer } from "react-navigation";

import NewsHome from '../pages/NewsHome';
import Article from '../pages/Article';

const AppNavigator = createStackNavigator({
  News: {
    screen: NewsHome,
    path: '/news/home',
    navigationOptions: {
      header: null,
    },
    headerBackTitleVisible: false,
  },
  Article: {
    screen: Article,
    path: '/news/article/:url',
    navigationOptions: {
      header: null,
    }
  }
});

export default createAppContainer(AppNavigator);

//export default Home;
