import React from 'react'
import { Body, Right, H1, Icon, Left, Header } from 'native-base';

/**
 * @author siemah
 * @version 1.0.0
 * @name HeaderIcon 
 * Header component contain some icons and text
 * @param 
 * @returns {React.Component}
 * NOTE: 
 * editing a height of Header in case use a transparent attribute
 * and changing paddintTop value either because header has inorme height
 */
const HeaderIcon = ({ style=null, onPressLeftIcon=null, onPressRightIcon=null, ...rest}) => {
  return (
    <Header style={{ paddingTop: 0, height: 60, ...style}} transparent {...rest}>
      <Left style={{ flex: null, width: 45, }} >
        <Icon onPress={onPressLeftIcon} name='md-arrow-back' style={{ color: 'red', fontSize: 35 }} />
      </Left>
      <Body style={{ alignItems: 'center' }}>
        <H1>ZEHU</H1>
      </Body>
      <Right style={{ flex: null, width: 45, }}>
        <Icon onPress={onPressRightIcon} name='md-heart' style={{ color: 'red', fontSize: 35 }} />
      </Right>
    </Header>
  )
}

export default HeaderIcon;