import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LogoutScreen from './Components/LogoutScreen';
import SelectButton from './Components/SelectButton';
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
        <Stack.Screen name="Button" component={SelectButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
