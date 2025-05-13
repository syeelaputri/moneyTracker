// halaman cash on bank

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {Header, TextInput} from '../../components/molecules';
import {TransactionCard} from '../../components/molecules';
import { getDatabase, onValue, ref, set } from "firebase/database";

// ubah format tanggal
function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const CashOnBank = ({ route }) => {
  const { uid } = route.params

  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [cashOnBankList, setCashOnBankList] = useState([])

  useEffect(() => {
    autoUpdateCashOnBankList()
  }, [])

  function handleSaveOnPress() {
    const randomId = new Date().getTime()

    const data = {
      date: new Date().toISOString(),
      description,
      type,
    }

    const db = getDatabase();
    set(ref(db, `users/${uid}/cashOnBank/${randomId}`), data);
  }

  function autoUpdateCashOnBankList() {
    const db = getDatabase();
    const cashOnBankListRef = ref(db, `users/${uid}/cashOnBank`)

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
      
      const filteredNewCashOnBankList = newCashOnBankList.slice(-3).reverse()
      console.log('newCashOnBankList', newCashOnBankList)
      console.log('filteredNewCashOnBankList', filteredNewCashOnBankList)
      setCashOnBankList(filteredNewCashOnBankList)
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Cash On Bank" />
      <Gap height={24} />

      <View style={styles.contentWrapper}>
        <Gap height={24} />
        <TextInput
          label="Description"
          placeholder="Add the description"
          value={description}
          onChangeText={setDescription}
        />
        <Gap height={16} />
        <TextInput
          label="Type"
          placeholder="Debit / Credit"
          value={type}
          onChangeText={setType}
        />
        <Gap height={16} />
        <Button
          label="Save"
          onPress={handleSaveOnPress}
        />
        <Gap height={128} />
        <Text style={styles.label}>Last 3 Transactions</Text>

        {cashOnBankList.map(cashOnBank => (
          <TransactionCard
            key={cashOnBank.date}
            date={formatDate(cashOnBank.date)}
            items={cashOnBank.description}
            price={cashOnBank.type}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  contentWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

export default CashOnBank;
