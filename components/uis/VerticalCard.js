import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Text, Content, Right, Body, Left, Thumbnail, List, ListItem } from 'native-base'

import ScrollThumbnail from './ScrollThumbnail';

const removeHtmlTags = html => html.replace(/<\/?[p|div|em|del|strong|b|u|i]>/gi, "");
const VerticalCard = ({ data }) => {
  const { loading, articles } = data;
  return (
    <Content>
      {/** The text container left side */}
      <List
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ScrollThumbnail />
        {
          loading ?
            (<ActivityIndicator size='large' color='blue' style={styles.activityIndicator} />) :
            (
              articles.map(article => (
                <ListItem key={article.url} thumbnail noIndent noBorder={true} onPress={() => alert('...')}>
                  <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0.005)' }}>
                    <Thumbnail source={{ uri: article.urlToImage }} style={styles.thumbnail} square large />
                  </Left>
                  <Body>
                    <View>
                      <Text numberOfLines={2} style={styles.articleTitle}>{article.title}</Text>
                    </View>
                    <View>
                      <Text numberOfLines={2} style={styles.articleExtract}>
                        {article.description}
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
    color: '#727484'
  }
});

export default VerticalCard
