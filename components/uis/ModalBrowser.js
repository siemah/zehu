import React, { useState } from 'react';
import { Modal, StyleSheet, View,  } from 'react-native';
import { WebView } from 'react-native-webview'
import { Content, Header, Left, Body, Icon, Title, Button, Container, Spinner } from 'native-base';

import Loader from './Loader'
const ModalBrowser = ({ visible = false, uri, onClose=()=>{}, ...rest }) => {
  const [width, setWidth] = useState("0%");
  return (
    <Modal visible={visible} source={{ uri }} {...rest}>
      <Container style={styles.container}>
        <Header style={styles.header} transparent>
          <Left>
            <Button onPress={onClose} transparent>
              <Icon name='close' style={styles.closeIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>{uri}</Title>
          </Body>
          <View style={[styles.progressBar, { width } ]}></View>
        </Header>
        <Content contentContainerStyle={styles.webViewContainer}>
          <WebView
            startInLoadingState
            onLoadProgress={({ nativeEvent }) => {
              let width = nativeEvent.progress * 100;
              setWidth(width===100? 0 : width);
            }}
            renderLoading={() => <Loader />}
            style={{ height: '100%', width: '100%', }}
            source={{ uri }} />
        </Content>
      </Container>
    </Modal>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: 60,
  },
  closeIcon: {
    fontSize: 40,
    color: '#0e1636',
  },
  headerTitle: {
    color: '#0e1636',
    fontSize: 15,
  },
  progressBar: {
    position:'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: "blue",
  },
  webViewContainer: {
    height: '100%',
    width: '100%',
  }
})

export default ModalBrowser;
