import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const FeedOverview = ({ result, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FeedDetail', { result: result })}
      >
        <Text>{result.title}</Text>
        <Text style={styles.time}>Time: {result.time} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginBottom: 10
  },
  time: {
    color: 'gray'
  }
});

export default withNavigation(FeedOverview);
