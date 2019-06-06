import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Text, Content, Right, Body, Left, Thumbnail, List, ListItem } from 'native-base'

import ScrollThumbnail from './ScrollThumbnail'; 

const removeHtmlTags = html => html.replace(/<\/?[p|div|em|del|strong|b|u|i]>/gi, "");
const VerticalCard = ({ data }) => {
  const { loading, articles } = data; 
  const uri = 'https://arabicpost.net/wp-content/uploads/2019/06/2e9f3e640cb92f33b3a6627f1ea95f199439a55e-250217060311-300x199.jpeg';
  return (
    <Content>
      {/** The text container left side */}
      <List >
        <ScrollThumbnail />
        {
          loading ?
            (<ActivityIndicator size='large' />) : 
            (
              articles.map(article => (
                <ListItem key={article.slug} thumbnail noIndent noBorder={true} onPress={() => alert('...')}>
                  <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0..5)' }}>
                    <Thumbnail source={{ uri }} style={styles.thumbnail} square large />
                  </Left>
                  <Body>
                    <View>
                      <Text numberOfLines={2} style={styles.articleTitle}>{article.title.rendered}</Text>
                    </View>
                    <View>
                      <Text numberOfLines={2} style={styles.articleExtract}>
                        {removeHtmlTags(article.excerpt.rendered)}
                      </Text>
                    </View>
                    {/** here maybe will add some like and stuffs like that */}
                  </Body>
                </ListItem>
              ))
            )
        }
      
      </List>
      <View></View> 
    </Content>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  thumbnail: { 
    borderRadius: 10, 
    overlayColor: '#ffffff',
    resizeMode: 'cover'
  },
  articleTitle: {
    fontWeight: '900',
    fontSize: 20,
    color: '#0e1636',
  },
  articleExtract: {
    color: '#727484'
  }
});

export default VerticalCard
