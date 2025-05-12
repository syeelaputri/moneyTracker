// tampung semua navigasi

import React from 'react';
import SplashScreen from '../pages/splash/index';
import SignUp from '../pages/signUp/index';
import SignIn from '../pages/signIn/index';
import Home from '../pages/home/index';
import CashOnHand from '../pages/cashOnHand/index';
import CashOnBank from '../pages/cashOnBank/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="cashOnHand" component={CashOnHand} />
        <Stack.Screen name="cashOnBank" component={CashOnBank} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
