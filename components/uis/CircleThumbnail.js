import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Content, Thumbnail, Text } from 'native-base'

const CircleThumbnail = ({ source, title='', category='', style={}, onPress=()=>{} }) => {
  const _onPress = () => onPress(category);
  return (
    <TouchableOpacity style={[style, styles.container]} onPress={_onPress} activeOpacity={.7}>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.thumbnailContainer}>
          <Thumbnail source={source} style={styles.thumbnail} />
        </View>
        <Text style={styles.text}>{ title }</Text>
      </Content>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: 'space-around',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: {
    borderRadius: 80,
    borderColor: '#cc518b',
    borderWidth: 2,
    padding: 2,
  },
  thumbnail: {
    padding: 20,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'Dosis',
    color: '#636576',
    fontWeight: "700"
  }
})

export default CircleThumbnail
