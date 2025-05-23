// halaman home

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {NullPhoto} from '../../assets';
import {getDatabase, ref, onValue} from 'firebase/database';

const Home = ({route, navigation}) => {
  const {uid} = route.params;
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState(NullPhoto);
  const [total, setTotal] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [cashOnBank, setCashOnBank] = useState(0);
  const [cashOnBankList, setCashOnBankList] = useState([])
  const [cashOnHandList, setCashOnHandList] = useState([])

  const db = getDatabase();

  useEffect(() => {
    autoUpdateCashOnBankAndHandList()
  }, [])

  useEffect(()=>{
    const userRef = ref(db, 'users/' + uid);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUser(data);
        setFullName(data.fullName);
        setPhoto({uri: data.photo});
        setTotal(data.balance.total);
        setCashOnHand(data.balance.cashOnHand);
        setCashOnBank(data.balance.cashOnBank);
      }
    });
  }, []);

  useEffect(() => {
    countCashOnBank()
  }, [cashOnBankList])

  useEffect(() => {
    countCashOnHand()
  }, [cashOnHandList])

  useEffect(() => {
    countTotalCash()
  }, [cashOnBank, cashOnHand])

  function autoUpdateCashOnBankAndHandList() {
    const db = getDatabase();
    const cashOnBankListRef = ref(db, `users/${uid}/cashOnBank`)
    const cashOnHandListRef = ref(db, `users/${uid}/cashOnHand`)

    onValue(cashOnBankListRef, snapshot => {
      const newCashOnBankList = transformFirebaseSnapshot(snapshot)

      function transformFirebaseSnapshot(snapshot) {
        const dataList = snapshot.val()
        if (!dataList) return []

        const combinedDataList = Object.entries(dataList).map(([key, value]) => ({
          _id: key,
          ...value
        }))

        return combinedDataList
      }

      setCashOnBankList(newCashOnBankList)
    })

    onValue(cashOnHandListRef, snapshot => {
      const newCashOnHandList = transformFirebaseSnapshot(snapshot)

      function transformFirebaseSnapshot(snapshot) {
        const dataList = snapshot.val()
        if (!dataList) return []

        const combinedDataList = Object.entries(dataList).map(([key, value]) => ({
          _id: key,
          ...value
        }))

        return combinedDataList
      }

      setCashOnHandList(newCashOnHandList)
    })
  }

  function countCashOnBank() {
    let newCashOnBank = 0
    cashOnBankList.forEach(item => {
      if (item.type.includes('-')) newCashOnBank -= parseInt(item.type.replace('-', ''))
      else newCashOnBank += parseInt(item.type)
    })
    setCashOnBank(newCashOnBank)
  }

  function countCashOnHand() {
    let newCashOnHand = 0
    cashOnHandList.forEach(item => {
      if (item.type.includes('-')) newCashOnHand -= parseInt(item.type.replace('-', ''))
      else newCashOnHand += parseInt(item.type)
    })
    setCashOnHand(newCashOnHand)
  }

  function countTotalCash() {
    const newTotal = cashOnBank + cashOnHand;
    setTotal(newTotal);
  }

  // tampilkan loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <Text style={styles.spinnerText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.appTitle}>Money Tracker</Text>
          <Text style={styles.appSubTitle}>Welcome, {fullName}</Text>
        </View>
        <Image source={photo} style={styles.photo} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.subTitle}>Your Balance</Text>
        <Text style={styles.total}>Rp. {total}</Text>
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
        <Button label="Cash On Hand" onPress={() => navigation.navigate('cashOnHand', { uid })} />
        <Gap height={10} />
        <Button label="Cash On Bank" onPress={() => navigation.navigate('cashOnBank', { uid })} />
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
  total: {
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
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerText: {
    fontSize: 16,
  }
});

export default Home;
