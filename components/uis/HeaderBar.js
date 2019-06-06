import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Body, Left, Button, Icon, Text, Content, Item, Input } from 'native-base';

/**
 * @name HeaderBar
 * HeaderBar component display a menu icon
 * and rendred on Top of screen
 * @author siemah 
 * @version 1.0.0
 * @param {String} title is a header title
 * @param {Object} iconStyle represent a style object of IconMenu
 */
const HeaderBar = ({ title='Search for ', iconStyle={color: 'black'}, ...rest }) => {
  return (
    <View {...rest}>
      <Header transparent style={style.header}>
        <TouchableOpacity style={[style.center, style.iconBtn]}>
          <Icon name='menu' style={iconStyle} />
        </TouchableOpacity>
        <Content>
          <Item rounded style={[style.inputItem]} >
            <Input placeholder='Rounded Textbox' style={style.input} />
            <Icon active name='search' onPress={()=> alert('Hey there')} />
          </Item>
        </Content>
      </Header>
    </View> 
  )
}

const style = StyleSheet.create({
  header: { top: 5 },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 45,
  },
  inputItem: {
    marginVertical: 5,
    backgroundColor: '#f1f3f4',
  },
  input: {
    padding: 5,
    height: 30,
    textAlign: 'center',
    color: '#98989a',
  }
})

export default HeaderBar; 
