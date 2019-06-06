import React from 'react'
import { View } from 'react-native';
import { Header, Body, Title, Left, Button, Icon } from 'native-base';

/**
 * @name HeaderBar
 * HeaderBar component display a menu icon
 * and rendred on Top of screen
 * @author siemah 
 * @version 1.0.0
 * @param {String} title is a header title
 * @param {Object} iconStyle represent a style object of IconMenu
 */
const HeaderBar = ({ title='', iconStyle={color: 'black'}, ...rest }) => {
  return (
    <View {...rest}>
      <Header transparent>
        <Left>
          <Button transparent>
            <Icon name='menu' style={iconStyle} />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
      </Header>
    </View> 
  )
}

export default HeaderBar; 
