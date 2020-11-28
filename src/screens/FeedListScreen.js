/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BottomNavBar from '../components/BottomNavBar';
import {
  TopNavigation,
  Layout,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import Validator from '../services/Validation';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import FeedList from '../components/FeedList';
import FeedListModal from '../components/FeedListModal';
import FeedFetcher from '../services/FeedFetcher';
import Toast from 'react-native-tiny-toast';
import MySafeAreaView from '../components/MySafeAreaView';
import ThemeSelector from '../services/ThemeSelector';

const FeedListScreen = ({ navigation }) => {
  const [feedList, setFeedList] = useState([]);
  const [visibleModal, setVisibleModal] = React.useState(false);

  useEffect(() => {
    loadFeedListFromStorage();
  }, []);

  async function loadFeedListFromStorage() {
    let feedListFromStorage = await FeedFetcher.loadFeedListFromStorage();
    if (feedListFromStorage == undefined || feedListFromStorage.length == 0) {
      setFeedList([]);
    } else {
      setFeedList([...feedListFromStorage]);
    }
  }

  const save = async (value, index) => {
    if (!Validator.validURL(value.link)) {
      return;
    }
    console.log('save', index);

    let updateList = (lst, itm, idx) => {
      console.log('updateList', idx, lst, itm);
      if (idx === -1) {
        return [...lst, itm];
      } else { 
        let newList = [...lst];
        newList[idx] = itm;
        return newList;
      }
    };

    try {
      let jsonValue = JSON.stringify(updateList(feedList, value, index));
      await AsyncStorage.setItem('FeedList', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
    setFeedList((oldArray) => updateList(oldArray, value, index));
    setVisibleModal(false);
  };

  const AddAction = () => (
    <TopNavigationAction
      icon={AddIcon}
      onPress={() => {
        addEditModalLoad('', '', 'Add Feed', -1);
        setVisibleModal(true);
      }}
    />
  );

  const AddIcon = (props) => <Icon {...props} name="plus-outline" />;

  const DeleteItemFromFeed = (indexToDelete) => {
    setFeedList(() => feedList.filter((_x, index) => index != indexToDelete));
  };

  const changeFeedLink = (item, name) => {
    console.log('Changing to', item, 'with name:', name);
    FeedFetcher.changeFeedLink(item, name);
    navigation.navigate('Feed');
    Toast.showSuccess('Changed current Feedlink!', {
      position: Toast.position.CENTER,
      duration: 1200,
    });
  };

  let addEditModalLoad;
  const addEditModal =
    <>
      <FeedListModal
        visible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}
        save={save}
        updateFunc={l => { addEditModalLoad = l; }}
      />
    </>;

  const editItem = (indexToEdit) => {
    let item = feedList[indexToEdit];
    console.log('To edit', item);
    addEditModalLoad(item.name, item.link, 'Save Feed', indexToEdit);
    setVisibleModal(true);
  };


  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  return (
    <Layout style={{ flex: 1 }}>
      <MySafeAreaView style={styles.description}>
        <TopNavigation
          title="FeedList"
          alignment="center"
          accessoryRight={AddAction}
        />
        <KeyboardAvoidingView behavior={'height'} style={styles.innerContainer}>
          {addEditModal}
          {feedList?.length == 0 ? (
            <EmptyPlaceholder
              firstText="Empty feed list"
              secondText="You can enter a feed link with the button above"
            />
          ) : (
              <FeedList
                feedList={feedList}
                setFeedList={DeleteItemFromFeed}
                changeFeedLink={changeFeedLink}
                editItem={editItem}
              />
            )}
        </KeyboardAvoidingView>
        <BottomNavBar
          index={0}
          navigation={navigation}
          style={styles.bottomNav}
        />
      </MySafeAreaView>
    </Layout>
  );
};

const lightStyles = StyleSheet.create({
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
  },
});

const darkStyles = StyleSheet.create({
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#222b44',
  },
});

export default FeedListScreen;
