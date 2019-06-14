import React from 'react'
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { View, Text, Content, Body, Left, Thumbnail, List, ListItem, Icon } from 'native-base'

import ScrollThumbnail from './ScrollThumbnail';

const removeHtmlTags = html => html.replace(/<\/?[p|div|em|del|strong|b|u|i]>/gi, "");
const VerticalCard = ({ data, goTo=null, onPress=null }) => {
  const { loading, articles } = data;
  console.warn('artices on flat', articles);
  
  return (
    <Content>
      {/** The text container left side */}
      
      <List
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        { onPress && <ScrollThumbnail onPress={onPress} /> }
        {
          loading 
            ? <ActivityIndicator size='large' color='blue' />
            : (
              <FlatList
                data={articles}
                keyExtractor={(item) => item.id}
                renderItem={({ item: article }) => (
                  <ListItem key={article.id} thumbnail noIndent noBorder={true} onPress={() => {
                    goTo('Article', article)
                   }}>
                    <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0.005)' }}>
                      <Thumbnail source={{ uri: article.image.url }} style={styles.thumbnail} square large />
                    </Left>
                    <Body>
                      <View>
                        <Text numberOfLines={2} style={styles.articleTitle}>{article.title}</Text>
                      </View>
                      <View>
                        <Text numberOfLines={2} style={styles.articleExtract}>
                          {removeHtmlTags(article.summary)}
                        </Text>
                      </View>
                      {/** here maybe will add some like and stuffs like that */}
                    </Body>
                    <View style={styles.divider}></View>
                  </ListItem>
                )}
              />
            )
        }

      </List>
    </Content>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  activityIndicator: {
    marginTop: 20,
  },
  thumbnail: {
    borderRadius: 10,
    //overlayColor: '#ffffff',
    resizeMode: 'cover'
  },
  articleTitle: {
    fontWeight: '900',
    fontSize: 20,
    color: '#0e1636',
  },
  articleExtract: {
    color: '#727484',
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: '#dfe6e6'
  }
});

export default VerticalCard
