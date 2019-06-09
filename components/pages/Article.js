/* @flow */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Card, Thumbnail, CardItem, Content, Left, Body, Icon, Button } from 'native-base'

import { saveArticle, removeArticle } from '../../utils/tools'

const Article = ({ navigation }) => {
  const { title, urlToImage, publishedAt, content, author, url, source } = navigation.state.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const _onPressBookmark = async () => {
    if( !isBookmarked ) {
      let isSaved = await saveArticle(navigation.state.params);
      setIsBookmarked(isSaved);
    }
    else {
      let isRemoved = await removeArticle(url);
      setIsBookmarked(!isRemoved);
      return;
    } 
  } 
  
  return (
    <Content style={styles.container}>
      <Card transparent>
        {/*<Image source={{ uri: urlToImage}} />*/}
        <CardItem>
          <Left>
            <View style={styles.thumbnailContainer}>
              <Thumbnail source={{ uri: urlToImage }} style={styles.thumbnail} square />
            </View>
            <Body>
              <Text style={styles.author}>{ author }</Text>
              <Text style={styles.secondaryText}>{ source.name }</Text>
              <Text style={styles.secondaryText}>{ publishedAt }</Text>
            </Body>
            <Button onPress={_onPressBookmark} transparent>
              <Icon 
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                active={true} 
                type='MaterialCommunityIcons' 
                style={styles.saveBtn}
               />  
            </Button>  
          </Left>
        </CardItem>
        <CardItem style={styles.articleImageContainer} cardBody>
          <Image source={{ uri: urlToImage }} style={styles.articleImage} />
        </CardItem>
      </Card>
      <View>
        <Text>{title}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>{content}</Text>
      </ScrollView>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    top:25,
  },
  thumbnailContainer: {
    elevation: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.005)',
  },
  thumbnail: { 
    borderRadius: 5,
  },
  saveBtn: { 
    color: '#f1b422',
    fontWeight: 'bold', 
    fontSize: 40, 
  },
  articleImageContainer: {
    margin: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.005)',
    elevation: 50,
  },
  articleImage: { 
    height: 200, 
    width: null, 
    borderRadius: 10,
    flex: 1 
  },
  author: {
    fontSize: 17,
    color: '#0e1636',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }, 
  secondaryText: {
    fontSize: 13,
    color: '#727484'
  }
});

export default Article;
