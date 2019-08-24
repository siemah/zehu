import React from 'react'
import { View, StyleSheet, } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

const Map = ({coords, style, ...rest}) => {
  return (
    <View 
      style={{...styles.mapContainer, ...style}} 
      {...rest} 
      >
      <MapView
        style={styles.map}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        maxZoomLevel={7}
        loadingEnabled
        >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude
          ,}}
          title={`Location of your's`}
          description={`You're here`}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default Map
