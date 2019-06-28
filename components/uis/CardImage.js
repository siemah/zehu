import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { CardItem } from 'native-base';


export default function CardImage({ source, containerStyle=null, imageStyle=null, title=null}) {
  return (
    <CardItem style={containerStyle} onPress={() => alert('Display all details about this funcking movies')} cardBody>
      <ImageBackground source={source} style={imageStyle} />
      {
        title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )
      }
    </CardItem>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  }
})
