import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TransactionCard = ({ date, items, price }) => {
  const isExpense = price < 0;
  const absPrice = Math.abs(price).toLocaleString('id-ID');
  const formattedPrice = `${isExpense ? '-' : ''}Rp. ${absPrice}`;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.items}>{items}</Text>
      </View>

      <Text style={[styles.price, isExpense ? styles.expense : styles.income]}>
        {formattedPrice}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 69,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    shadowColor: 'black',
    elevation: 8,
    marginBottom: 16,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
  },
  items: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: 'bold',
  },
  expense: {
    color: '#D9435E',
  },
  income: {
    color: '#1ABC9C',
  },
});

export default TransactionCard;
