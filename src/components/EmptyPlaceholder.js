import { dark } from '@eva-design/eva';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ThemeSelector from '../services/ThemeSelector';

const EmptyPlaceholder = ({ firstText, secondText }) => {
  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{firstText}</Text>
        <Text style={styles.text}>{secondText}</Text>
      </View>
    </View>
  );
};

const lightStylesProto = {
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
    color: '#000',
  },
};
const darkStylesProto = {
  textContainer: {
    backgroundColor: '#192033',
    borderRadius: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
    color: '#fff',
  },
};

const lightStyles = StyleSheet.create(lightStylesProto);
const darkStyles = StyleSheet.flatten([lightStyles, StyleSheet.create(darkStylesProto)]);


export default EmptyPlaceholder;
