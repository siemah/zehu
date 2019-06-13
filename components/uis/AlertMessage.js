import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button, Icon, Content, } from 'native-base';

const AlertMessage = ({ message='Something went wrong :(', onPress=null }) => {
  return (
    <Content contentContainerStyle={{...styles.center, ...styles.container}}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{ message }</Text>
      </View>
      <View style={styles.center}>
        <Button onPress={onPress} style={[styles.center, styles.btn]} bordered warning>
          <Icon name='warning' />
          <Text style={styles.text}>Try again</Text>
        </Button>
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  messageContainer: {
    marginVertical: 10,
  },
  text: {
    color: '#0e1636',
    fontSize: 24,
  },
  btn: {
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  }
});
export default AlertMessage;
