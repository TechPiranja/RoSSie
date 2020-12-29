/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MySafeAreaView from '../components/MySafeAreaView';
import { RefreshControl, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import FeedOverview from '../components/FeedOverview';
import BottomNavBar from '../components/BottomNavBar';
import FeedFetcher from '../services/FeedFetcher';
import { useIsFocused } from '@react-navigation/native';
import { TopNavigation, Layout, Spinner } from '@ui-kitten/components';
import Validator from '../services/Validation';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import ThemeSelector from '../services/ThemeSelector';
import Utils from '../services/utils';

const FeedScreen = ({ navigation }) => {
  const [feed, setFeed] = useState([]);
  const [loadedFeedLink, setLoadedFeedLink] = useState('');
  const [loadedFeedName, setLoadedFeedName] = useState('Feed');
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  });

  useEffect(() => {
    async function hasFeedLinkChanged() {
      let currentLink = await FeedFetcher.getCurrentFeedLink();
      let currentName = await FeedFetcher.getCurrentFeedName();
      console.log('Loaded Feed Name: ' + loadedFeedName);

      if (currentLink == '' || currentLink == null) {
        setFeed([]);
        setLoadedFeedLink(null);
        setLoadedFeedName('Feed');
      } else if (!Validator.validURL(currentLink)) {
        return;
      } else if (
        loadedFeedLink !== currentLink ||
        currentName !== loadedFeedName
      ) {
        load();
        setLoadedFeedLink(currentLink);
        setLoadedFeedName(currentName);
      }
    }
    hasFeedLinkChanged();
  }, [isFocused]);

  const load = async () => {
    let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
    if (!Validator.validURL(currentFeedLink)) {
      return;
    }
    let jsonValue = await AsyncStorage.getItem('FeedData' + currentFeedLink);
    jsonValue = JSON.parse(jsonValue);
    if (jsonValue == null || jsonValue.length == 0) {
      console.log('Feed was not inside offline storage');
      onRefresh();
      return;
    }

    let tempArr = [];
    jsonValue.forEach((element) => {
      if (!tempArr.some((e) => e.title === element.title)) {
        tempArr = [...tempArr, element];
      }
    });

    setFeed(() => [...tempArr]);
  };

  const fetchData = async () => {
    let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
    console.log(currentFeedLink);
    if (currentFeedLink == '' || currentFeedLink == null) {
      setFeed([]);
      setLoadedFeedLink(null);
      return;
    }
    setFetching(true);
    let data = await FeedFetcher.fetchData();
    let isReload = currentFeedLink !== loadedFeedLink ? false : true;
    let newFeed = await FeedFetcher.loadXmlToFeed(data, isReload, feed);
    setFeed([...newFeed]);
    setFetching(false);
  };

  const saveIsRead = async () => {
    FeedFetcher.save('FeedData' + loadedFeedLink, feed);
    console.log('Save is read');
  };

  //registerForPushNotificationsAsync(); <Button title="Delete Feed" onPress={() => setFeed((oldArray) => [])} />

  const styles = ThemeSelector.getDarkModeEnabled() ? darkStyles : lightStyles;
  return (
    <MySafeAreaView>
      <TopNavigation title={loadedFeedName} alignment="center" />
      {feed?.length == 0 ? (
        fetching ? (
          <Layout style={styles.centered}>
            <Spinner size="giant" />
            <Text style={{ color: '#999', margin: 10 }}>Loading</Text>
          </Layout>
        ) : (
            <Layout style={styles.centered}>
              <EmptyPlaceholder
                firstText="No feed link provided"
                secondText="Please add a link inside the FeedList Menu"
              />
            </Layout>
          )
      ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
            data={Utils.groupByToList(feed, itm => itm.time ? new Date(itm.time).toDateString() : '')}
            renderItem={({ item }) => {
              let lst = [];
              if (item.key) {
                lst.push(
                  <Text style={styles.groupByText}>
                    {(new Date(item.key)).toDateString()}
                  </Text>
                );
              }
              item.values.forEach(itm => {
                lst.push(
                  <FeedOverview
                    result={itm}
                    navigation={navigation}
                    saveIsRead={saveIsRead}
                  />);
              });
              return lst;
            }}
            keyExtractor={(_item, index) => index.toString()}
          />
        )}
      <BottomNavBar index={1} navigation={navigation} />
    </MySafeAreaView>
  );
};

const lightStylesProto = {
  centered: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  groupByText: {
    marginLeft: 10,
    marginTop: 25,
    fontSize: 22,
    color: '#777',
  },
};
const darkStylesProto = {
  centered: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222b44',
  },
  groupByText: {
    marginLeft: 10,
    marginTop: 25,
    fontSize: 22,
    color: '#aaa',
  },
};

const lightStyles = StyleSheet.create(lightStylesProto);
const darkStyles = StyleSheet.flatten([
  lightStyles,
  StyleSheet.create(darkStylesProto),
]);

export default FeedScreen;
