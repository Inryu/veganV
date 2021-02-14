import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LogoutScreen from './Screen/LogoutScreen';
import DetectBarcode from './Screen/DetectBarcode';
import BarcodeResult from './Screen/BarcodeResult';
import 'react-native-gesture-handler';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetectBarcode"
          component={DetectBarcode}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="BarcodeResult"
          component={BarcodeResult}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
