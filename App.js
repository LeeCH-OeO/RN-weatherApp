import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CurrentData} from './pages/current';
import DailyForeCast from './pages/forecast';
import HourlyForecast from './pages/hourlyForeCast';
const Tab = createMaterialTopTabNavigator();
function App() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      {colorScheme === 'dark' ? (
        <StatusBar barStyle={'light-content'} backgroundColor={'#121212'} />
      ) : (
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      )}
      <Tab.Navigator
        initialRouteNam="Current"
        screenOptions={
          colorScheme === 'dark'
            ? {
                tabBarStyle: {backgroundColor: '#121212'},
                tabBarLabelStyle: {fontFamily: 'monospace'},
                tabBarActiveTintColor: 'white',
                tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
                tabBarIndicatorStyle: {backgroundColor: 'white'},
              }
            : {
                tabBarStyle: {backgroundColor: 'white'},
                tabBarLabelStyle: {fontFamily: 'monospace'},
                tabBarActiveTintColor: '#121212',
                tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
                tabBarIndicatorStyle: {backgroundColor: '#121212'},
              }
        }>
        <Tab.Screen name="Current" component={CurrentData} />
        <Tab.Screen name="Hourly" component={HourlyForecast} />
        <Tab.Screen name="Daily " component={DailyForeCast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
