import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { H1 } from 'native-base';

const Movie = ({ navigation }) => {
  let { title, source, id, } = navigation.state.params;
  console.warn(source, id);
  
  return (
    <View>
      <H1>{ title } </H1>
    </View>
  )
}

export default Movie
