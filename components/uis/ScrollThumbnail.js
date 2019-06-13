import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CircleThumbnail from './CircleThumbnail';

const ScrollThumbnail = ({onPress}) => {
  return (
    <View style={style.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <CircleThumbnail onPress={onPress} category={null} source={require('../../assets/images/news.jpg')} title='General' />
        <CircleThumbnail onPress={onPress} category='sp' source={require('../../assets/images/movies.jpg')} title='Sports' />
        <CircleThumbnail onPress={onPress} category='te' source={require('../../assets/images/prayer.jpg')} title='Tech' />
        <CircleThumbnail onPress={onPress} category='po' source={require('../../assets/images/weather.png')} title='Politic' />
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
