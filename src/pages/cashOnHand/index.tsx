// halaman cash on hand

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {Header, TextInput} from '../../components/molecules';
import {TransactionCard} from '../../components/molecules';

const CashOnHand = ({}) => {
    // const onSave = () => { // otw logic

  return (
    <ScrollView style={styles.container}>
      <Header title="Cash On Hand" />
      <Gap height={24} />
        <View style={styles.contentWrapper}>
            <TextInput
                label="Description"
                placeholder="Add the description"
            />
            <TextInput
                label="Type"
                placeholder="Debit / Credit"
            />
            <Button
                label="Save"
                onPress={onSave}
            />
            <Gap height={24} />
            <Text style={styles.label}>Last 3 Transactions</Text>
            <TransactionCard // mo ganti semua, sesuaikan dgn data
                date="17 April 2020"
                item="Water, Food"
                price="-Rp. 300.000"
            />
            <TransactionCard // mo ganti semua, sesuaikan dgn data
                date="18 April 2020"
                item="Office supplies"
                price="-Rp. 300.000"
            />
            <TransactionCard // mo ganti semua, sesuaikan dgn data
                date="19 April 2020"
                item="Top Up"
                price="+Rp. 300.000"
            />
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
  },
});

export default CashOnHand;
