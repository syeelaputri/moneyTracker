// atur gap

import React from 'react';
import {StyleSheet, View} from 'react-native';

const Gap = ({height}) => {
  return <View style={styles.gap(height)} />;
};

const styles = StyleSheet.create({
  gap: height => ({
    height: height,
  }),
});

export default Gap;
