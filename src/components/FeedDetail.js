import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Linking} from 'react-native';
import {ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import ThemeSelector from '../services/ThemeSelector';

const FeedDetail = ({result}) => {
  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  const htmlStyles = ThemeSelector.getDarkModeEnabled()
    ? darkHTMLStyles
    : lightHTMLStyles;

  let text = result.description.trim();
  console.log('text:', text);

  Icon.loadFont();
  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 10}}>
        <Text style={styles.title}>{result.title}</Text>
        <HTML
          html={text}
          imagesMaxWidth={Dimensions.get('window').width}
          onLinkPress={(_event, url) => Linking.openURL(url)}
          tagsStyles={htmlStyles.tagsStyles}
          classesStyles={htmlStyles.classesStyles}
          baseFontStyle={htmlStyles.baseFontStyle}
        />
        <View style={styles.bottomContainer}>
          {result.time ? (
            <Text style={styles.time}>Time: {result.time} </Text>
          ) : null}
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            onPress={() => {
              Linking.openURL(result.link.toString());
              console.log('test');
            }}>
            <Icon name="external-link" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const lightStylesProto = {
  container: {
    backgroundColor: '#fff',
    top: 0,
  },
  time: {
    position: 'absolute',
    bottom: 0,
    color: 'gray',
  },
  title: {
    color: '#000',
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
};
const darkStylesProto = {
  container: {
    backgroundColor: '#222b44',
    top: 0,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

const lightStyles = StyleSheet.create(lightStylesProto);
const darkStyles = StyleSheet.flatten([
  lightStyles,
  StyleSheet.create(darkStylesProto),
]);

const lightHTMLStyles = {
  tagsStyles: {
    p: {
      marginTop: 5,
    },
    a: {
      color: '#273d66',
    },
    blockquote: {
      marginHorizontal: 25,
      marginVertical: 10,
    },
  },
  classesStyles: {},
  baseFontStyle: {
    color: '#000',
  },
};
const darkHTMLStyles = {
  tagsStyles: {
    p: {
      marginTop: 5,
    },
    a: {
      color: '#5e92f3',
    },
    blockquote: {
      marginHorizontal: 25,
      marginVertical: 10,
    },
  },
  classesStyles: {},
  baseFontStyle: {
    color: '#fff',
  },
};

export default FeedDetail;
