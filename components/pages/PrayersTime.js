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
/**
 * 1- verify if the user has enable reaching the location using devices
 * 2- fetch the data for this mounth
 * 3- update the state and render the list of times
 * 4- cleaning fetch request
*/
const usePrayersTimes = (city=null) => {
  const _isMounted = true;
  const [prayersTime, setPrayersTime] = useState(null);
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();
  //if(!city && !coords) return [null];
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        let coords = await getCoords();
        console.warn(coords);
        let { data, status } = await Axios.get(`${link}&longitude=${coords.longitude}&latitude=${coords.latitude}`, {
          cancelToken: source.token
        });
        if(status === 200 && data.status === 'OK') {
          _isMounted && setPrayersTime(data.results);
        }
      } catch (error) {
        console.warn(error);
      }
    }
    fetchPrayers();
    return () => {
      _isMounted = false;
      // canceling the reauest
      source.cancel('Operation canceled by the user.');
    };
  }, []);
  return [ prayersTime, setPrayersTime]
;}
const PrayersTime = () => {
  
  const [prayersTimes] = usePrayersTimes();

  return (
    <Content>
      <Text>prayers times {JSON.stringify(prayersTimes)}</Text>
    </Content>
  )
}

export default PrayersTime;