/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {useState} from 'react';
import { Container } from 'native-base';

import Splash from './components/pages/Splash';
import MainDrawerNavigator from './components/menus/MainDrawerNavigator';
//import Fetch from './components/pages/Fetch';

//import NewsContext, { newsContextState } from './store/context/news'; 

const App = () => {
  const [loadScreens, setLoadScreens] = useState(false);
  // in fact rather than use a timer it better to fetch data 
  // or maybe check if the use is loggedin or some network things
  setTimeout(() => setLoadScreens(true), 2000);
  if(!loadScreens) return <Splash />
  return (
    <Container>
      <MainDrawerNavigator />
    </Container>
  );
}

export default App;