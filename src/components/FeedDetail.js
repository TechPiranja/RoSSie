import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Linking} from 'react-native';
import {ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';

const FeedDetail = ({result}) => {
  Icon.loadFont();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{result.title}</Text>
      <HTML
        html={result.description}
        imagesMaxWidth={Dimensions.get('window').width}
        onLinkPress={(_event, url) => Linking.openURL(url)}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.time}>Time: {result.time} </Text>
        <TouchableOpacity
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          onPress={() => {
            Linking.openURL(result.link.toString());
            console.log('test');
          }}>
          <Icon name="external-link" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    top: 0,
  },
  time: {
    position: 'absolute',
    bottom: 0,
    color: 'gray',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconStyle: {
    fontSize: 30,
    color: '#5e92f3',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  bottomContainer: {
    marginTop: 50,
    marginRight: 5,
  },
});

export default FeedDetail;
