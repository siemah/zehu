import React from 'react'
import { View } from 'react-native';
import { CardItem, Body, H3, Right, Icon, Title } from 'native-base';

const TitleIcon = ({ title, icon, iconStyle=null}) => {
  return (
    <CardItem>
      <Body>
        <Title style={{ color: '#0e1636' }}>{ title }</Title>
      </Body>
      <Right>
        <Icon name={icon} style={{ ...iconStyle, fontSize: 30 }} />
      </Right>
    </CardItem>
  )
}

export default TitleIcon;
