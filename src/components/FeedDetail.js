import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FeedDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.title}</Text>
      <Text>{result.description}</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.time}>Time: {result.time} </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(result.link.toString())}
        >
          <Feather name='external-link' style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  time: {
    position: 'absolute',
    bottom: 0,
    color: 'gray'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  iconStyle: {
    fontSize: 25,
    color: '#5e92f3',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  bottomContainer: {
    marginTop: 50
  }
});

export default FeedDetail;
