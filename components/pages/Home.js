import React, { Component } from 'react';
import { Content, Container } from 'native-base';

import HeaderBar from '../uis/HeaderBar'; 

const Home = (props) => {
  return (
    <Container >
      <HeaderBar 
        style={{backgroundColor: 'pink'}}
        iconStyle={{ color: 'blue' }} />
    </Container>
  )
}

export default Home;
