import { Divider, Button } from '@ui-kitten/components';
import React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { SwipeListView } from 'react-native-swipe-list-view';
import FeedFetcher from '../services/FeedFetcher';
import ThemeSelector from '../services/ThemeSelector';

const deleteFeedItemIndex = async (indexToDelete, feedList, setFeedList) => {
  setFeedList(indexToDelete);
  FeedFetcher.save(
    'FeedList',
    feedList.filter((_x, index) => index != indexToDelete),
  );
  let link = await FeedFetcher.getCurrentFeedLink();
  await FeedFetcher.removeFeed(link);
};
const deleteFeedItem = async (data, feedList, setFeedList) => {
  let indexToDelete = feedList.indexOf(data.item);
  await deleteFeedItemIndex(indexToDelete, feedList, setFeedList);
};

const editFeedItem = async (data, feedList, editItem) => {
  let indexToEdit = feedList.indexOf(data.item);
  editItem(indexToEdit);
};

const FeedList = ({ feedList, setFeedList, changeFeedLink, editItem }) => {
  const [deleteWidth, setDeleteWidth] = useState(new Animated.Value(100));

  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  const deleteAnimatedStyle = {
    width: deleteWidth,
  };
  return (
    <SwipeListView
      disableRightSwipe
      style={styles.list}
      data={feedList}
      renderItem={({ item }) => {
        return (
          <View>
            <Divider />
            <Button
              style={styles.btn}
              appearance="ghost"
              onPress={() => changeFeedLink(item.link, item.name)}>
              {item.name}
            </Button>
          </View>
        );
      }}
      renderHiddenItem={(data) => (
        <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
            <TouchableOpacity
              onPress={() => editFeedItem(data, feedList, editItem)}
              style={styles.backText}>
              <Text style={styles.backRightBtnLeftText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight, deleteAnimatedStyle]}>
            <TouchableOpacity
              onPress={() => deleteFeedItem(data, feedList, setFeedList)}
              style={styles.backText}>
              <Text style={{ color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
          </Animated.View >
        </View>
      )}
      rightOpenValue={-175}
      keyExtractor={(_item, index) => index.toString()}
      swipeToOpenVelocityContribution={5}
      rightActivationValue={-300}
      onRightActionStatusChange={({ isActivated }) => {
        if (isActivated) {
          Animated.timing(deleteWidth, {
            toValue: Dimensions.get('window').width,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
            delay: 0,
          }).start();
        } else {
          Animated.timing(deleteWidth, {
            toValue: 100,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
            delay: 0,
          }).start();
        }
      }}
      onRightAction={(rowKey) => {
        deleteFeedItemIndex(rowKey, feedList, setFeedList);
      }}
    />
  );
};

const lightStylesProto = {
  btn: {
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  list: {
    height: '80%',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  backRightBtnRight: {
    backgroundColor: '#d33',
    right: 0,
    width: 100,
  },
  backRightBtnLeft: {
    backgroundColor: '#eee',
    right: 100,
    width: 75,
  },
  backRightBtnLeftText: {
    color: '#000',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backText: {
    color: '#fff',
  },
};

const darkStylesProto = {
  btn: {
    backgroundColor: '#222b44',
    borderRadius: 0,
  },
  backRightBtnLeft: {
    backgroundColor: '#192033',
    right: 100,
    width: 75,
    color: '#fff',
  },
  backRightBtnLeftText: {
    color: '#fff',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#192033',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backText: {
    color: '#000',
  },
};

const lightStyles = StyleSheet.create(lightStylesProto);
const darkStyles = StyleSheet.flatten([lightStyles, StyleSheet.create(darkStylesProto)]);


export default FeedList;
