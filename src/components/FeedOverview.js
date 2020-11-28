import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeSelector from '../services/ThemeSelector';

const FeedOverview = ({ result, navigation }) => {
  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FeedDetail', { result: result })}>
        <Text style={styles.text}>{result.title}</Text>
        {result.time ? <Text style={styles.time}>Time: {result.time} </Text> : null}
      </TouchableOpacity>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  text: {
    color: '#000',
  },
  time: {
    color: 'gray',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#222b44',
    padding: 10,
    borderColor: '#192033',
    borderWidth: 0.5,
  },
  text: {
    color: '#fff',
  },
  time: {
    color: 'gray',
  },
});

export default FeedOverview;
