import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const EmptyPlaceholder = ({firstText, secondText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{firstText}</Text>
        <Text style={styles.text}>{secondText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
  },
});

export default EmptyPlaceholder;
