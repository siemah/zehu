import React, { useState, useEffect } from 'react'
import { Text, View, Spinner, Separator, ListItem, Left, H3, Right, Icon, Container, Fab, Card, CardItem, Body, } from 'native-base';
import Axios from 'axios';
import { FlatList, Alert, StyleSheet, } from 'react-native';
import FadeInView from '../animations/FadeInView';
import { isCurrentDayTimes, getCoords, saveUserLocsation, savePrayersTimes, getPrayersTimes } from '../../utils/tools';
import HeaderBar from '../uis/HeaderBar';
import NetInfo from "@react-native-community/netinfo";
import Map from '../uis/Map';

const link = `https://api.pray.zone/v2/times/this_week.json?school=8`;

/**
 * 1- verify if the user has enable reaching the location using devices
 * 2- fetch the data for this mounth
 * 3- update the state and render the list of times
 * 4- cleaning fetch request
*/
const usePrayersTimes = (city=null) => {
  let _isMounted = true;
  const [prayersTimes, setPrayersTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [coords, setCoords] = useState(null);
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    const fetchPrayers = async () => {
      let res;
      setLoading(true);
      try {
        if(isOffline) {
          res = await getPrayersTimes();
          _isMounted && setPrayersTimes(res);
          _isMounted && setLoading(false);
        } else {
          if(!city) {
            let coords = await getCoords();
            setCoords(coords);
            saveUserLocsation(coords, Date.now());
            res = await Axios.get(`${link}&elevation=8000&longitude=${coords.longitude}&latitude=${coords.latitude}`, {
              cancelToken: source.token
            });
          } else {
            res = await Axios.get(`${link}&city=${city}`, {
              cancelToken: source.token
            });
          }
          let { data, status } = res;
          if(status === 200 && data.status === 'OK') {
            _isMounted && setPrayersTimes(data.results);
            _isMounted && setLoading(false);
            await savePrayersTimes(data.results);
          }
        }
      } catch (error) {
        let msg = error.response.status === 500 
          ? 'The name of city unrecognized' 
          : 'Verify your network and try again';
      
        _isMounted && setLoading(false);
        Alert.alert(
          'Prayers times error',
          msg
        )
      }
    }
    fetchPrayers();
    return () => {
      _isMounted = false;
      // canceling the reauest
      source.cancel('Operation canceled by the user.');
    };
  }, [city, isOffline]);
  return [ {prayersTimes, loading, isOffline, coords}, setPrayersTimes, setIsOffline];
}

const PrayersTime = ({ navigation }) => {
  
  const [city, setCity] = useState(null);
  
  const [data,, setIsOffline] = usePrayersTimes(city);
  const {prayersTimes, loading, isOffline} = data;
  /**
   * render a item
   * @param {Object} param1 contain the item and index of each element passed to data attribute
   */
  const _renderItem = ({item, index}) => {
    
    let { times, date } = item;
    let kindOfDay = isCurrentDayTimes(parseInt(date.timestamp, 10));
    
    if(kindOfDay === -1)
      return null;
    return (
      <FadeInView delay={index * 60}>
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
  
  /**
   * handle the case of missing network
   * create a custom hook to fetch data saved locally
   * render those data if there are any
   */
  let _isMounted = true;
  useEffect(() => {
    NetInfo.isConnected.fetch().then(isConnected => {
      _isMounted && setIsOffline(!isConnected);
    });
    return () => _isMounted = false;
  }, []);
  
  return (
    <Container>
      <HeaderBar 
        onPress={navigation.toggleDrawer} 
        onSubmit={setCity}
        title='Write City'
        style={{paddingBottom: 15}} />
      {
        isOffline && (
          <Fab
            active={isOffline}
            direction="up"
            containerStyle={{ zIndex: 20 }}
            style={{ backgroundColor: 'rgba(255, 206, 15, 0.8)' }}
            position="bottomRight"
            onPress={() => Alert.alert(
              'No Internet',
              'You don\'t have internet connexion, This data is saved earlier'
            )}
            >
            <Icon name="warning" />
          </Fab>
        )
      }
      {
        prayersTimes === null || loading
        ? <Spinner size='large' color='#50499e' />
        : (
          <>
            <Card>
              <CardItem>
                <Body>
                  <H3>Timezone: {prayersTimes.location.timezone}</H3>
                  <H3>Elevation: {prayersTimes.location.elevation} metres</H3>
                </Body>
              </CardItem>
            </Card>
            <FlatList
              data={prayersTimes.datetime}
              renderItem={_renderItem}
              keyExtractor={({date}, index) => `${date.timestamp}-${index}`}
              ListHeaderComponent={<Map style={styles.map} coords={data.coords} />}
            />
          </>
        )
      }
    </Container>
  )
}

const styles = {
  dosis: {
    fontFamily: 'Dosis',
    fontWeight: '500'
  },
  map:{
    height: 150,
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