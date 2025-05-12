// halaman home

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {NullPhoto} from '../../assets';
import {getDatabase, ref, onValue} from 'firebase/database';


const Home = ({route}) => {
  const {uid} = route.params;
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState(NullPhoto);
  const [totalBalance, setTotalBalance] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [cashOnBank, setCashOnBank] = useState(0);

  const db = getDatabase();

  useEffect(()=>{
    const userRef = ref(db, 'users/' + uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        setUser(data);
        setFullName(data.fullName);
        setPhoto({uri: data.photo});
        setTotalBalance(data.balance.total);
        setCashOnHand(data.balance.cashOnHand);
        setCashOnBank(data.balance.cashOnBank);
      }
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <View>
          {/* <Text style={styles.appTitle}>{`Hi, ${fullName}`}</Text> */}
          <Text style={styles.appTitle}>Money Tracker</Text>
          {/* <Text style={styles.appSubTitle}>Have you track your money today?</Text> */}
          <Text style={styles.appSubTitle}>Welcome, {fullName}</Text>
        </View>
        <Image source={photo} style={styles.photo} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.subTitle}>Your Balance</Text>
        <Text style={styles.totalBalance}>Rp. {totalBalance}</Text>
        <View style={styles.line} />
        <View style={styles.subTotalWrapper}>
          <Text style={styles.subTotal}>Cash On Hand</Text>
          <Text style={styles.subTotal}>Rp. {cashOnHand}</Text>
        </View>
        <View style={styles.subTotalWrapper}>
          <Text style={styles.subTotal}>Cash On Bank</Text>
          <Text style={styles.subTotal}>Rp. {cashOnBank}</Text>
        </View>
        <Text style={styles.subTitle}>Add Transaction</Text>
        <Button label="Cash On Hand" onPress={() => {}} />
        <Gap height={10} />
        <Button label="Cash On Bank" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    flex: 1,
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 16,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  totalBalance: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginVertical: 18,
  },
  subTotalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTotal: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#020202',
    fontWeight: 'bold',
  },
  appSubTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#8D92A3',
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
});

export default Home;
