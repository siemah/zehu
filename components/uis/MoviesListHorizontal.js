import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import CardImage from './CardImage';

/**
 * @name MoviesListHorizontal
 * present list of movies horizontal accept the props of ScrollView either
 * @author siemah 
 * @version 1.0.0
 * @param {Object} props a list of attribute passed from ancestors, 
 * however this list contain:
 * 1/- data of type array contain a list of object which those has title and source as props
 * 2/- cardImageContainerStyle and cardImageStyle present a styles of CardImage container and the image inside it
 * @return {React.Component}
 */
const MoviesListHorizontal = ({ data = [], cardImageContainerStyle=null, cardImageStyle=null, ...rest}) => {
  //console.warn(data);
  
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal 
      data={data}
      keyExtractor={item=> `${item.id}`}
      renderItem={({item}) => (
        <Card style={[styles.card,]} key={item.id} transparent>
          <CardImage
            title={item.title}
            source={item.source}
            containerStyle={[styles.moviePosterContainer, cardImageContainerStyle]}
            imageStyle={[styles.moviePoster, cardImageStyle]} />
        </Card>
      )}
      {...rest}
    />
  )
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  moviePosterContainer: {
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 15,
    flex: 1,
    borderRadius: 10,
    height: 180,
    width: 250,
    elevation: 10,
  },
  moviePoster: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  }
});

export default MoviesListHorizontal;
