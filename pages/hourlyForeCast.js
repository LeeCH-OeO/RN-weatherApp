import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  RefreshControl,
  ScrollView,
  Pressable,
  useColorScheme,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
const convertDate = date => {
  let convertDate = new Date(date * 1000).toLocaleString();
  return convertDate;
};
function HourlyForecast() {
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(
      Geolocation.getCurrentPosition(
        val => {
          fetchData(val.coords.latitude, val.coords.longitude);
          ToastAndroid.show(
            '已更新資料',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        err => {
          if (err) {
            console.log(err);
          }
        },
      ),
    );
  };
  const fetchData = (latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=ca20b15c0e2800058d1de6ba9abe60f6&units=metric&lang=zh_tw`,
    ).then(res =>
      res.json().then(data => {
        setData(data);
      }),
    );
  };
  const handleOnRefresh = () => {
    setRefreshing(true);
    getLocation();
    setRefreshing(false);
  };
  return (
    <ScrollView
      style={
        colorScheme === 'dark'
          ? {backgroundColor: '#121212'}
          : {backgroundColor: 'white'}
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          style={styles.body}
        />
      }>
      {data ? (
        data.hourly.map(result => {
          return (
            <View style={styles.resultItem} key={result.dt}>
              <View style={styles.dateView}>
                <Text style={styles.text}>
                  {convertDate(result.dt)}
                  {'\n'}
                  溫度: {result.temp}°C {result.weather[0].description}
                  {'\n'}體感溫度: {result.feels_like}°C 濕度: {result.humidity}%
                </Text>

                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
                  }}
                />
              </View>
            </View>
          );
        })
      ) : (
        <Text></Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'green',
    fontSize: 20,
    fontFamily: 'monospace',
  },
  resultItem: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dateText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  icon: {
    width: 100,
    height: 100,
  },
});
export default HourlyForecast;
