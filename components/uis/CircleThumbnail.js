import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Thumbnail, Text } from 'native-base'

const CircleThumbnail = ({ source, title='', style={} }) => {
  return (
    <TouchableOpacity style={[style, styles.container]} activeOpacity={1}>
      <Content contentContainerStyle={styles.content}>
        <Thumbnail source={source} style={styles.thumbnail} />
        <Text style={styles.text}>{ title }</Text>
      </Content>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    justifyContent: 'space-around',
    flex: 1,
    display: 'flex',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    borderWidth: 2,
    borderColor: '#cc518b',
    padding: 20,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 14,
    color: '#636576',
  }
})

export default CircleThumbnail
