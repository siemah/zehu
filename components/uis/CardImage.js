import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function CardImage({ source, containerStyle=null, imageStyle=null, title=null, onPress=null, ...rest}) {
  return (
    <View style={styles.overflow}>
      <TouchableOpacity style={containerStyle}  onPress={onPress} {...rest}>

        <ImageBackground source={source} style={imageStyle} />
        {
          title && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )
        }

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
  }
})
