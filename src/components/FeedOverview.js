import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FeedOverview = ({result, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FeedDetail', {result: result})}>
        <Text>{result.title}</Text>
        <Text style={styles.time}>Time: {result.time} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  time: {
    color: 'gray',
  },
});

export default FeedOverview;
