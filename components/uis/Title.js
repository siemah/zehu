import React from 'react'
import { View } from 'react-native';
import { CardItem, Body, H3, Right, Icon, Title } from 'native-base';

/**
 * @name TitleIcon
 * display a title with an icon
 * @author siemah 
 * @version 1.0.0
 * @param {Object} props a list of attribute passed from ancestors, 
 * however this list contain:
 * 1/- title is string present the title
 * 2/- icon the name of Icon to use
 * 3/- iconStyle the style of Icon
 * @return {React.Component}
 */
const TitleIcon = ({ title, icon, iconStyle=null}) => {
  return (
    <CardItem>
      <Body>
        <Title style={{ color: '#0e1636', fontFamily: 'Dosis' }}>{ title }</Title>
      </Body>
      <Right>
        <Icon name={icon} style={{ ...iconStyle, fontSize: 30 }} />
      </Right>
    </CardItem>
  )
}

export default TitleIcon;
