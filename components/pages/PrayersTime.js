import React, { useState, useEffect } from 'react'
import { Content, Text } from 'native-base';
import Axios from 'axios';

const link = `https://api.pray.zone/v2/times/this_week.json?elevation=8000&school=8`;
/**
 * 1- if yes, then update the state and save coords on AsyncStorage
 * 2- if not then use a city name rather than location coords
 */
const getCoords = config => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    resolve(coords);
  }, err => reject(err), config);
})

const PrayersTime = () => {

  return (
    <Content>
      <Text>prayers times </Text>
    </Content>
  )
}

export default PrayersTime;