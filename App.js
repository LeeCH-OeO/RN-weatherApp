import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CurrentData from './pages/current';
import ForeCast from './pages/forecast';

const Tab = createMaterialTopTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Tab.Navigator
        initialRouteNam="Current"
        screenOptions={{
          tabBarStyle: {backgroundColor: 'white'},
          tabBarLabelStyle: {fontFamily: 'monospace'},
          tabBarActiveTintColor: 'green',
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
        }}>
        <Tab.Screen name="Current" component={CurrentData} />
        <Tab.Screen name="ForeCast" component={ForeCast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
