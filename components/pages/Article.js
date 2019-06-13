/* @flow */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Card, Thumbnail, CardItem, Container, Content, Left, Body, Icon, Button, Footer, Right } from 'native-base'

import ModalBrowser from '../uis/ModalBrowser';
import { saveArticle, removeArticle } from '../../utils/tools'

/**
 * @name Article
 * @author siemah
 * @version 1.0.0
 * @param {Object} props list of props passed by React.Componenet
 * display article content and published ..etc
 */
const Article = ({ navigation }) => {
  const { title, image, date_published, summary, author='Unknownen author', url, feed } = navigation.state.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [visible, setVisible] = useState(false)
  /**
   * @name _onPressBookmark
   * fired when user click on bookmark button
   * on right top of Article header
   */
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
  // display a ModalBrowser
  const _onPressVisitSource = () => setVisible(visible => !visible );
  // return to previous navigatio like NewsHome
  const _onBack = () => navigation.goBack();

  return (
    <Container>
      <Content style={styles.container}>
        <Card transparent>
          {/*<Image source={{ uri: urlToImage}} />*/}
          <CardItem>
            <Left>
              <View style={styles.thumbnailContainer}>
                <Thumbnail source={{ uri: image.url }} style={styles.thumbnail} square />
              </View>
              <Body>
                <Text style={styles.author}>{ author }</Text>
                <Text style={styles.secondaryText}>{ feed.title }</Text>
                <Text style={styles.secondaryText}>{ date_published }</Text>
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
            <Image source={{ uri: image.url }} style={styles.articleImage} />
          </CardItem>
        </Card>
        <View style={styles.contentContainer}>
          <View style={styles.articleTitleContainer}>
            <Text style={styles.articleTitle}>{ title }</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.articleContent}>{ summary }</Text>
          </ScrollView>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Left style={{...styles.footerBtnContainer, }}>
          <Button style={[styles.footerBtn, styles.footerLeftBtn]} onPress={_onBack} danger>
            <Icon name='arrow-back' style={{color:'#000000',}} />
          </Button>
        </Left>
        <Right style={styles.footerBtnContainer}>
          <Button style={styles.footerBtn} onPress={_onPressVisitSource}>
            <Text style={styles.footerBtnText}>Visit</Text>
            <Icon name='arrow-forward' />
          </Button>
        </Right>
      </Footer>
      <ModalBrowser visible={visible} onClose={_onPressVisitSource} uri={url} style={{backgroundColor: 'red'}} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    top:20,
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
    elevation: 30,
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
  },
  contentContainer: {
    padding: 15,
    flex: 1,
  },
  articleTitleContainer: {
    marginBottom: 15,
  },
  articleTitle: {
    fontSize: 25,
    color: '#0e1636',
    fontWeight: 'bold',
  },
  articleContent: {
    fontSize: 18,
    color: "#4e5686",
    paddingBottom: 25,
  },
  footer: {
    backgroundColor: 'white',
    height: 60,
  },
  footerBtnContainer: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  footerLeftBtn: {
    paddingLeft:10,
    backgroundColor: 'rgba(222, 222, 222, 1)',
    borderTopStartRadius: 0,
    elevation: 0,
    padding: 10,
  },
  footerBtn: {
    backgroundColor: '#0e1636',
    borderRadius: 0,
    borderTopStartRadius: 50,
    paddingLeft: 35,
    paddingRight: 10,
    position: 'absolute',
    top: 0,
    height: '100%',
  },
  footerBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Article;
