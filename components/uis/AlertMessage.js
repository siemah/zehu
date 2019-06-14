import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button, Icon, Content, } from 'native-base';

/**
 * @author siemah
 * @version 1.0.0
 * @name AlertMessage
 * Render a message with a button action
 * @param {Object} herited from React.Component 
 * and passed by parent where contain :
 * message the title render
 * onPress action firend when button clicked
 * buttonText button title
 * @return React.Component
 */
const AlertMessage = ({ message='Something went wrong :(', onPress=null, buttonText='Try again', ...rest }) => {
  return (
    <Content contentContainerStyle={{ ...styles.center, ...styles.container }} {...rest}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{ message }</Text>
      </View>
      {
        onPress && (
          <View style={styles.center}>
            <Button onPress={onPress} style={[styles.center, styles.btn]} bordered warning>
              <Icon name='warning' />
              <Text style={styles.text}>{buttonText}</Text>
            </Button>
          </View>
        )
      }
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
