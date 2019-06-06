import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, Content, Right, Body, Left, Thumbnail, List, ListItem } from 'native-base'
import ScrollThumbnail from './ScrollThumbnail'; 

const VerticalCard = () => {
  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
  return (
    <Content>
      {/** The text container left side */}
      <List >
        <ScrollThumbnail />
        <ListItem thumbnail noIndent noBorder={true} onPress={() => alert('...')}>
          <Left style={{elevation: 15, backgroundColor: 'rgba(255,255,255, 0..5)'}}>
            <Thumbnail source={{ uri }} style={styles.thumbnail} square large />
          </Left>
          <Body>
            <View>
              <Text numberOfLines={2} style={styles.articleTitle}>Title of article and the ùain thing and more content</Text>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.articleExtract}>Extract content of the whole article without forgeting the overflow of content ...</Text>
            </View>
            {/** here maybe will add some like and stuffs like that */}
          </Body>
        </ListItem>
        <ListItem thumbnail noIndent noBorder={true}>
          <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0..5)' }}>
            <Thumbnail source={{ uri }} style={styles.thumbnail} square large />
          </Left>
          <Body style={{}}>
            <View>
              <Text numberOfLines={2} style={styles.articleTitle}>Title of article and the ùain thing and more content</Text>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.articleExtract}>Extract content of the whole article without forgeting the overflow of content ...</Text>
            </View>
            {/** here maybe will add some like and stuffs like that */}
          </Body>
        </ListItem>
        <ListItem thumbnail noIndent noBorder={true}>
          <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0..5)' }}>
            <Thumbnail source={{ uri }} style={styles.thumbnail} square large />
          </Left>
          <Body style={{}}>
            <View>
              <Text numberOfLines={2} style={styles.articleTitle}>Title of article and the ùain thing and more content</Text>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.articleExtract}>Extract content of the whole article without forgeting the overflow of content ...</Text>
            </View>
            {/** here maybe will add some like and stuffs like that */}
          </Body>
        </ListItem><ListItem thumbnail noIndent noBorder={true}>
          <Left style={{ elevation: 15, backgroundColor: 'rgba(255,255,255, 0..5)' }}>
            <Thumbnail source={{ uri }} style={styles.thumbnail} square large />
          </Left>
          <Body style={{}}>
            <View>
              <Text numberOfLines={2} style={styles.articleTitle}>Title of article and the ùain thing and more content</Text>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.articleExtract}>Extract content of the whole article without forgeting the overflow of content ...</Text>
            </View>
            {/** here maybe will add some like and stuffs like that */}
          </Body>
        </ListItem>
      
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
