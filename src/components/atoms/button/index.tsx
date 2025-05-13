// buat button

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({label, color = '#02CF8E', textColor = '#020202', onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button(color)}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.label(textColor)}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: color => ({
    backgroundColor: color,
    borderRadius: 8,
    paddingVertical: 12,
  }),
  label: textColor => ({
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: textColor,
    fontWeight: 'bold',
  }),
});

export default Button;
