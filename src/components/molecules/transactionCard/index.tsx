// buat text input

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TransactionCard = ({date, item, price}) => {
  return (
    <View style={styles.container}>
        <View style={styles.container2}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.item}>{item}</Text>
        </View>
            <View style={styles.container3}>
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 312,
        height: 69,
        borderRadius: 10,
    },
    container2: {
        justifyContent: 'flex-start',
    },
    container3: {
        alignItems: 'center',
    },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    marginBottom: 6,
  },
    item: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '##020202',
    marginBottom: 6,
    },
      price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#D9435E', // #1ABC9C klo dpe doi positif (nd utang/kurang)
    marginBottom: 6,
      }
});

export default TransactionCard;
