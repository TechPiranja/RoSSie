/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import MySafeAreaView from '../components/MySafeAreaView';
import {
  RefreshControl,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import FeedOverview from '../components/FeedOverview';
import BottomNavBar from '../components/BottomNavBar';
import FeedFetcher from '../services/FeedFetcher';
import {useIsFocused} from '@react-navigation/native';
import {TopNavigation, Layout, Spinner} from '@ui-kitten/components';
import Validator from '../services/Validation';
import EmptyPlaceholder from '../components/EmptyPlaceholder';

const FeedScreen = ({navigation}) => {
  const [feed, setFeed] = useState([]);
  const [loadedFeedLink, setLoadedFeedLink] = useState('');
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
      console.log(currentLink);
      console.log(loadedFeedLink);
      if (currentLink == '' || currentLink == null) {
        setFeed([]);
        setLoadedFeedLink(null);
      } else if (!Validator.validURL(currentLink)) {
        return;
      } else if (loadedFeedLink !== currentLink) {
        load();
        setLoadedFeedLink(currentLink);
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

  //registerForPushNotificationsAsync(); <Button title="Delete Feed" onPress={() => setFeed((oldArray) => [])} />

  return (
    <MySafeAreaView>
      <TopNavigation title="Feed" alignment="center" />
      {feed?.length == 0 ? (
        fetching ? (
          <Layout style={styles.centered}>
            <Spinner size="giant" />
            <Text style={{color: '#999', margin: 10}}>Loading</Text>
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
          data={feed}
          renderItem={({item}) => {
            return <FeedOverview result={item} navigation={navigation} />;
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      )}
      <BottomNavBar index={1} navigation={navigation} />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default FeedScreen;
