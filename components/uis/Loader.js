import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * @name Loader 
 * Is replace for ActivityIndicator wrapped by View
 * @param {Object} props list of props passed by Parent @see React.Component
 * 			containerStyle style of View
 *			style object of style for
 *			size the size of ActivityIndicator
 *			color is clair
 */
const Loader = ({ containerStyle={}, style={}, size='large', color='#0e1636', ...rest}) => (
  <View style={[ styles.container, containerStyle ]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff', 
		position: 'absolute', 
		top: 0, 
		left: 0, 
		width: '100%', 
		height: '100%', 
		justifyContent: 'center', 
		alignItems: 'center',
	},
});

export default Loader;