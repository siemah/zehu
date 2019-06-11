import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CircleThumbnail from './CircleThumbnail';

const ScrollThumbnail = ({onPress}) => {
  return (
    <View style={style.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <CircleThumbnail onPress={onPress} category='general' source={require('../../assets/images/news.jpg')} title='News' />
        <CircleThumbnail onPress={onPress} category='sports' source={require('../../assets/images/movies.jpg')} title='Movies' />
        <CircleThumbnail onPress={onPress} category='technology' source={require('../../assets/images/prayer.jpg')} title='Prayer' />
        <CircleThumbnail onPress={onPress} category='business' source={require('../../assets/images/weather.png')} title='Weather' />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: 110,
    paddingLeft: 10,
  },
});

export default ScrollThumbnail;
