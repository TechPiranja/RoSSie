import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FeedOverview = ({result, navigation, saveIsRead}) => {
  const ReadFeed = () => {
    result.isRead = true;
    saveIsRead();
    navigation.navigate('FeedDetail', {result: result});
  };

  return (
    <View
      // eslint-disable-next-line prettier/prettier
      style={[ styles.container, result.isRead ? styles.isRead : styles.isUnread]}>
      <TouchableOpacity onPress={ReadFeed}>
        <Text style={result.isRead && {color: '#444'}}>{result.title}</Text>
        {result.time ? (
          <Text style={styles.time}>Time: {result.time} </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 0.5,
  },
  isUnread: {
    backgroundColor: '#FFFFFF',
  },
  isRead: {
    backgroundColor: '#ddd',
  },
  time: {
    color: 'gray',
  },
});

export default FeedOverview;
