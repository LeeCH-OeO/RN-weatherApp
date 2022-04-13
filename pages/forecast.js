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
const convertDate = (date, offset) => {
  let convertDate = new Date((date + offset) * 1000).toDateString();
  return convertDate;
};

function ForeCast() {
  const colorScheme = useColorScheme();
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [extend, setExtend] = useState(false);
  const [extend1, setExtend1] = useState(false);
  const [extend2, setExtend2] = useState(false);
  const [extend3, setExtend3] = useState(false);
  const [extend4, setExtend4] = useState(false);
  const [extend5, setExtend5] = useState(false);
  const [extend6, setExtend6] = useState(false);
  const [extend7, setExtend7] = useState(false);

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
    setExtend(false);
    setExtend1(false);
    setExtend2(false);
    setExtend3(false);
    setExtend4(false);
    setExtend5(false);
    setExtend6(false);
    setExtend7(false);
  };
  const handleOnPress = () => {
    setExtend(!extend);
  };
  const handleOnPress1 = () => {
    setExtend1(!extend1);
  };

  const handleOnPress2 = () => {
    setExtend2(!extend2);
  };
  const handleOnPress3 = () => {
    setExtend3(!extend3);
  };
  const handleOnPress4 = () => {
    setExtend4(!extend4);
  };
  const handleOnPress5 = () => {
    setExtend5(!extend5);
  };
  const handleOnPress6 = () => {
    setExtend6(!extend6);
  };
  const handleOnPress7 = () => {
    setExtend7(!extend7);
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
        <View>
          <Pressable onPress={handleOnPress} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[0].dt, data.timezone_offset)}{' '}
                  {data.daily[0].weather[0].description}
                  {'\n'}
                  ⬆️{data.daily[0].temp.max}°C ⬇️{data.daily[0].temp.min}°C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[0].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[0].feels_like.night} °C {'\n'}
                  濕度: {data.daily[0].humidity}%{'\n'}
                  風速: {data.daily[0].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[0].uvi}
                  {'\n'}
                  降雨機率: {data.daily[0].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress1} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[1].dt, data.timezone_offset)}{' '}
                  {data.daily[1].weather[0].description}
                  {'\n'}
                  ⬆️{data.daily[1].temp.max}°C ⬇️{data.daily[1].temp.min}°C{' '}
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend1 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[1].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[1].feels_like.night} °C {'\n'}
                  濕度: {data.daily[1].humidity}%{'\n'}
                  風速: {data.daily[1].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[1].uvi}
                  {'\n'}
                  降雨機率: {data.daily[1].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress2} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[2].dt, data.timezone_offset)}{' '}
                  {data.daily[2].weather[0].description}
                  {'\n'}
                  ⬆️{data.daily[2].temp.max}°C ⬇️{data.daily[2].temp.min}°C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend2 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[2].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[2].feels_like.night} °C {'\n'}
                  濕度: {data.daily[2].humidity}%{'\n'}
                  風速: {data.daily[2].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[2].uvi}
                  {'\n'}
                  降雨機率: {data.daily[2].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress3} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[3].dt, data.timezone_offset)}{' '}
                  {data.daily[3].weather[0].description}
                  {'\n'}⬆️{data.daily[3].temp.max}°C ⬇️{data.daily[3].temp.min}
                  °C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend3 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[3].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[3].feels_like.night} °C {'\n'}
                  濕度: {data.daily[3].humidity}%{'\n'}
                  風速: {data.daily[3].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[3].uvi}
                  {'\n'}
                  降雨機率: {data.daily[3].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress4} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[4].dt, data.timezone_offset)}{' '}
                  {data.daily[4].weather[0].description}
                  {'\n'}⬆️{data.daily[4].temp.max}°C ⬇️{data.daily[4].temp.min}
                  °C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend4 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[4].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[4].feels_like.night} °C {'\n'}
                  濕度: {data.daily[4].humidity}%{'\n'}
                  風速: {data.daily[4].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[4].uvi}
                  {'\n'}
                  降雨機率: {data.daily[4].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress5} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[5].dt, data.timezone_offset)}{' '}
                  {data.daily[5].weather[0].description}
                  {'\n'}⬆️{data.daily[5].temp.max}°C ⬇️{data.daily[5].temp.min}
                  °C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend5 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[5].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[5].feels_like.night} °C {'\n'}
                  濕度: {data.daily[5].humidity}%{'\n'}
                  風速: {data.daily[5].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[5].uvi}
                  {'\n'}
                  降雨機率: {data.daily[5].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress6} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[6].dt, data.timezone_offset)}{' '}
                  {data.daily[6].weather[0].description}
                  {'\n'}⬆️{data.daily[6].temp.max}°C ⬇️{data.daily[6].temp.min}
                  °C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend6 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[6].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[6].feels_like.night} °C {'\n'}
                  濕度: {data.daily[6].humidity}%{'\n'}
                  風速: {data.daily[6].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[6].uvi}
                  {'\n'}
                  降雨機率: {data.daily[6].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>

          <Pressable onPress={handleOnPress7} android_ripple={{color: 'gray'}}>
            <View style={styles.resultItem}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {convertDate(data.daily[7].dt, data.timezone_offset)}{' '}
                  {data.daily[7].weather[0].description}
                  {'\n'}⬆️{data.daily[7].temp.max}°C ⬇️{data.daily[7].temp.min}
                  °C
                </Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${data.daily[7].weather[0].icon}@2x.png`,
                  }}
                />
              </View>
              {extend7 ? (
                <Text style={styles.text}>
                  ☀️體感溫度: {data.daily[7].feels_like.day}°C{'\n'}🌃體感溫度:{' '}
                  {data.daily[7].feels_like.night} °C {'\n'}
                  濕度: {data.daily[7].humidity}%{'\n'}
                  風速: {data.daily[7].wind_speed}m/s{'\n'}UV index:{' '}
                  {data.daily[7].uvi}
                  {'\n'}
                  降雨機率: {data.daily[7].pop}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </Pressable>
        </View>
      ) : (
        <Text>請下拉刷新!</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  icon: {
    width: 70,
    height: 70,
  },
});

export default ForeCast;
