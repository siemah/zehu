import React, { useState, useEffect } from 'react'
import { Content, Text, View, Spinner, Separator, ListItem, Left, H3, Right, Icon, Container, } from 'native-base';
import Axios from 'axios';
import { FlatList } from 'react-native';
import FadeInView from '../animations/FadeInView';
import { isCurrentDayTimes } from '../../utils/tools';
import HeaderBar from '../uis/HeaderBar';

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

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        let coords = await getCoords();
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
  return [ prayersTime, setPrayersTime];
}

const PrayersTime = () => {
  
  const [prayersTimes] = usePrayersTimes();

  const _renderItem = ({item, index}) => {
  
    let { times, date } = item;
    let kindOfDay = isCurrentDayTimes(parseInt(date.timestamp, 10));

    if(kindOfDay === -1)
      return null;
    return (
      <FadeInView delay={index * 100}>
        <Separator style={styles.separator} bordered>
          <Text style={styles.separatorText}>{ date.gregorian}</Text>
          {
            kindOfDay === 0 &&  
            <View style={styles.iconContainer}>
              <Icon active name="md-clock" style={{color: '#50499e'}} />
            </View>
          }
        </Separator>
        <ListItem>
          <Left>
            <H3 style={styles.dosis} style={styles.dosis}>Fajr</H3>
          </Left>
          <Right>
            <H3 style={styles.dosis}>{times.Fajr}</H3>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <H3 style={styles.dosis}>Dhuhr</H3>
          </Left>
          <Right>
            <H3 style={styles.dosis}>{times.Dhuhr}</H3>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <H3 style={styles.dosis}>Asr</H3>
          </Left>
          <Right>
            <H3 style={styles.dosis}>{times.Asr}</H3>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <H3 style={styles.dosis}>Maghrib</H3>
          </Left>
          <Right>
            <H3 style={styles.dosis}>{times.Maghrib}</H3>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <H3 style={styles.dosis}>Isha</H3>
          </Left>
          <Right>
            <H3 style={styles.dosis}>{times.Isha}</H3>
          </Right>
        </ListItem>
      </FadeInView>
    );
  }

  return (
    <Container>
    <Content>
      <HeaderBar onPress={null} onSubmit={null} style={{paddingTop: 0}} />
      {
        prayersTimes === null 
        ? <Spinner size='large' color='#50499e' />
        : <FlatList
            data={prayersTimes.datetime}
            renderItem={_renderItem}
            keyExtractor={({date}, index) => `${date.timestamp}-${index}`}
        />
      }
    </Content>
    </Container>
  )
}

const styles = {
  dosis: {
    fontFamily: 'Dosis',
    fontWeight: '500'
  },
  separator: {
    height: 'auto',
  },
  separatorText: {
    ...this.dosis,
    fontSize: 15,
  },
  iconContainer: {
    position: 'absolute', 
    right: 15,
  },
};

export default PrayersTime;