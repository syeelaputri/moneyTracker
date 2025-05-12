// halaman splash

import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('signIn'), 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.title}>Money Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#02CF8E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
  },
});

export default Splash;
