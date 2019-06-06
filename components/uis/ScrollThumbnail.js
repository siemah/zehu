import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CircleThumbnail from './CircleThumbnail'; 

const ScrollThumbnail = () => {
  return (
    <View style={style.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <CircleThumbnail source={require('../../assets/images/news.jpg')} title='News' />
        <CircleThumbnail source={require('../../assets/images/movies.jpg')} title='Movies' />
        <CircleThumbnail source={require('../../assets/images/prayer.jpg')} title='Prayer' />
        <CircleThumbnail source={require('../../assets/images/weather.png')} title='Weather' />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: 80,
    paddingLeft: 10,
  },
});

export default ScrollThumbnail;
