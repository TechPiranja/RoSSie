import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedDetail from '../components/FeedDetail';

const FeedDetailScreen = ({ navigation }) => {
  const result = navigation.getParam('result');
  return (
    <View style={styles.description}>
      <FeedDetail result={result} />
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10
  },
  time: {
    color: 'gray'
  }
});

export default FeedDetailScreen;
