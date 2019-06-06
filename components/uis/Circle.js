import React from 'react'
import { View, StyleSheet } from 'react-native';

function Circle({ circleStyle=[] }) {
  return (
    <View style={[style.container, circleStyle]}>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(55, 125, 255, 0.2)',
  }
}); 

export default Circle;

