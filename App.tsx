import React from 'react';
import SplashScreen from './src/pages/splash';
import SignUp from './src/pages/signUp';
import SignIn from './src/pages/signIn';
import Home from './src/pages/home';
import CashOnHand from './src/pages/cashOnHand';
import CashOnBank from './src/pages/cashOnBank';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import './src/config/firebase';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cashOnHand"
          component={CashOnHand}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="cashOnBank"
          component={CashOnBank}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
