import React from 'react'
import { 
  StyleSheet, 
  ActivityIndicator, 
  FlatList,
  Dimensions,
} from 'react-native';
import { 
  View, 
  Text, 
  Content, 
  Body, 
  Left, 
  Thumbnail, 
  List, 
  ListItem, 
} from 'native-base'

import ScrollThumbnail from './ScrollThumbnail';
import AlertMessage from './AlertMessage'

const { height } = Dimensions.get('screen');
const removeHtmlTags = html => html.replace(/<\/?[p|div|em|del|strong|b|u|i]>/gi, "");
/**
 * @author siemah
 * @version 1.0.0
 * @name VerticalCard
 * UI component for display a list of article items 
 * @param {Object} props list of props herit from React and other HOC
 * @return React.Component
 */
const VerticalCard = ({ data, goTo=null, onPress=null }) => {
  const { loading, articles, message } = data;
  /**
   * @name _renderItem
   * render each item depend on data passed to FlatList
   * @param {Object} contain item and index as props
   * @return React.Component
   */
  const _renderItem = ({ item: article }) => {
    const { url = null } = article && article.image;
    const imageSource = url !== null && url.length ? { uri: url } : require('../../assets/images/logo-150x150.png');

    return (
      <ListItem key={article.id} thumbnail noIndent noBorder={true} onPress={() => {
        goTo('Article', article)
      }}>
        <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0.005)' }}>
          <Thumbnail source={imageSource} style={styles.thumbnail} square large />
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
    )
  };
  
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
                renderItem={_renderItem}
                ListEmptyComponent={<AlertMessage message={message} style={{height}} />}
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
    fontFamily: 'Dosis',
    color: '#0e1636',
  },
  articleExtract: {
    fontFamily: 'Dosis',
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
