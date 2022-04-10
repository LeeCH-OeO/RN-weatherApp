import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

function CurrentData() {
  useEffect(() => {
    getLocation();
  }, []);
  const colorScheme = useColorScheme();
  const [data, setData] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [sunriseTime, setsunriseTime] = useState('');
  const [sunsetTime, setsunsetTime] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [AQIData, setAQIData] = useState('');
  const [cityName, setCityName] = useState('');
  const AQIResult = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getLocation = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(
      Geolocation.getCurrentPosition(
        val => {
          fetchAQIData(val.coords.latitude, val.coords.longitude);
          fetchCity(val.coords.latitude, val.coords.longitude);
          fetchData(val.coords.latitude, val.coords.longitude);
          setLatitude(val.coords.latitude);
          setLongitude(val.coords.longitude);
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
  const fetchData = async (latitude, longitude) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=ca20b15c0e2800058d1de6ba9abe60f6&units=metric&lang=zh_tw`,
    ).then(res =>
      res.json().then(data => {
        let now = new Date(
          (data.current.dt + data.timezone_offset) * 1000,
        ).toISOString();
        let sunrise = new Date(
          (data.current.sunrise + data.timezone_offset) * 1000,
        ).toISOString();
        let sunset = new Date(
          (data.current.sunset + data.timezone_offset) * 1000,
        ).toISOString();
        setData(data);
        setCurrentTime(now);
        setsunriseTime(sunrise);
        setsunsetTime(sunset);
      }),
    );
  };
  const fetchAQIData = async (latitude, longitude) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=ca20b15c0e2800058d1de6ba9abe60f6`,
    ).then(res =>
      res.json().then(AQIData => {
        setAQIData(AQIData);
        console.log(AQIData.list);
      }),
    );
  };
  const fetchCity = async (latitude, longitude) => {
    await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    ).then(res =>
      res.json().then(cityData => {
        setCityName(
          `${cityData.address.state}${cityData.address.suburb}${cityData.address.neighbourhood}  `,
        );
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
        <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
      }>
      <View style={styles.body}>
        <View style={styles.result}>
          <Text style={styles.text}>
            {cityName ? `${cityName} ` : `位置: ${latitude} ${longitude}\n`}
            {currentTime ? currentTime : ''}
            {'\n'}
            {data ? data.current.weather[0].description : ''}
            {'\n'}
            溫度:{data ? data.current.temp : ''}°C 體感溫度:{' '}
            {data ? data.current.feels_like : ''}°C {'\n'}
            UV index: {data ? data.current.uvi : ''}
            {'\n'}
            濕度: {data ? data.current.humidity : ''}% {'\n'}
            風速: {data ? data.current.wind_speed : ''}m/s {'\n'}
            能見度: {data ? data.current.visibility : ''}m 🌅:
            {sunriseTime ? sunriseTime : ''}
            {'\n'}
            🌇:{sunsetTime ? sunsetTime : ''}
            {/* {AQIData
              ? `\nAQI:${AQIResult[AQIData.list[0].main.aqi - 1]}\n`
              : '\n'} */}
          </Text>
        </View>
      </View>
      {AQIData ? (
        <View style={styles.AqiResult}>
          <Text style={styles.text}>
            {`AQI: ${AQIResult[AQIData.list[0].main.aqi - 1]}`}
            {'\n'}
            {`CO: ${AQIData.list[0].components.co} μg/m³`}
            {'\n'}
            {`NO: ${AQIData.list[0].components.no} μg/m³`}
            {'\n'}
            {`NO₂: ${AQIData.list[0].components.no2} μg/m³`}
            {'\n'}
            {`O₃ : ${AQIData.list[0].components.o3} μg/m³`}
            {'\n'}
            {`SO₂: ${AQIData.list[0].components.so2} μg/m³`}
            {'\n'}
            {`PM2.5: ${AQIData.list[0].components.pm2_5} μg/m³`}
            {'\n'}
            {`PM10: ${AQIData.list[0].components.pm10} μg/m³`}
            {'\n'}
            {`NH₃: ${AQIData.list[0].components.nh3} μg/m³`}
            {'\n'}
          </Text>
        </View>
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
    padding: 10,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    color: 'green',
    fontSize: 20,
    margin: 10,
    lineHeight: 30,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  icon: {
    width: 150,
    height: 150,
  },
  AqiResult: {
    borderColor: 'green',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CurrentData;
