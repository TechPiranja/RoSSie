import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeSelector from '../services/ThemeSelector';

const FeedOverview = ({result, navigation, saveIsRead}) => {
  const ReadFeed = () => {
    result.isRead = true;
    saveIsRead();
    navigation.navigate('FeedDetail', {result: result});
  };

  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  return (
    <View
      // eslint-disable-next-line prettier/prettier
      style={[ styles.container, result.isRead ? styles.isRead : styles.isUnread]}>
      <TouchableOpacity onPress={ReadFeed}>
        <Text style={result.isRead ? styles.isRead : styles.isUnread}>{result.title}</Text>
        {result.time ? (
          <Text style={styles.time}>Time: {result.time} </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 0.5,
  },
  text: {
    color: '#000',
  },
  time: {
    color: 'gray',
  },
  isUnread: {
    backgroundColor: '#fff',
    color: '#000',
  },
  isRead: {
    backgroundColor: '#ddd',
    color: '#444'
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
  isUnread: {
    backgroundColor: '#192033',
    color: '#fff'
  },
  isRead: {
    backgroundColor: '#222b44',
    color: '#aaa'
  },
});

export default FeedOverview;
