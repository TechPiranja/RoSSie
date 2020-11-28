import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Validator from './Validation';

class FeedFetcher {
  getCurrentFeedLink = async () => {
    let currentFeedLink = await AsyncStorage.getItem('CurrentFeedLink');
    return JSON.parse(currentFeedLink);
  };

  getCurrentFeedName = async () => {
    let currentFeedName = await AsyncStorage.getItem('CurrentFeedName');
    return JSON.parse(currentFeedName);
  }

  fetchData = async () => {
    let currentFeedLink = await this.getCurrentFeedLink();
    const response = await axios
      .get(currentFeedLink)
      .catch((error) => console.log('FetchData: ' + error));
    return response;
  };

  save = async (key, value) => {
    try {
      let jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  changeFeedLink = async (link, name) => {
    this.save('CurrentFeedLink', link);
    this.save('CurrentFeedName', name);
  };

  clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };

  clearOfflineFeedStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let feedLinks = await this.loadFeedListFromStorage();
    if (feedLinks === undefined || feedLinks.length === 0) {
      return;
    }
    let filteredKeys = keys.filter((x) =>
      feedLinks.some((link) => x.includes(link)),
    );
    await AsyncStorage.multiRemove(filteredKeys);
  };

  clearFeedLinkListFromStorage = async () => {
    await this.clearOfflineFeedStorage();
    await this.save('FeedList', []);
  };

  loadFeedListFromStorage = async () => {
    let jsonValue = await AsyncStorage.getItem('FeedList');
    jsonValue = JSON.parse(jsonValue);
    if (jsonValue === null || jsonValue.length === 0) {
      return;
    }
    let tempList = [];
    jsonValue.forEach((element) => {
      tempList.push(element);
    });

    return tempList;
  };

  removeFeed = async (link) => {
    AsyncStorage.removeItem('FeedData' + link);
  };

  loadXmlToFeed = async (value, isReload, feed) => {
    let tempArr = [];
    let rssData = [];
    let parseString = require('react-native-xml2js').parseString;
    parseString(value.data, function (_err, result) {
      let obj = JSON.stringify(result);
      if (obj === undefined) {
        console.log('data was undefined!');
        return;
      }
      let data = JSON.parse(obj);
      data.rss.channel[0].item.forEach((element) => {
        let x = {
          title: element.title[0],
          time: element.pubDate,
          link: element.link,
          description: element.description[0],
        };
        rssData.push(x);
      });
    });

    console.log(rssData.length + ' and ' + feed.length);
    // if the data length is same and the first item is same, the fetched list has no new items, so we just return
    if (
      isReload &&
      rssData.length === feed.length &&
      rssData[0].title === feed[0].title
    ) {
      console.log('is same so return');
      return rssData;
    }

    // fills data by checking for "isReload" -> full data or only new data
    rssData.forEach((obj) => {
      if (
        !(
          isReload &&
          !feed.some((e) => e.title === obj.title) &&
          !tempArr.some((e) => e.title === obj.title)
        )
      ) {
        tempArr.push(obj);
      } else if (!tempArr.some((e) => e.title === obj.title)) {
        tempArr.push(obj);
      }
    });

    let currentFeedLink = await this.getCurrentFeedLink();
    if (Validator.validURL(currentFeedLink)) {
      await this.save('FeedData' + currentFeedLink, tempArr);
      console.log('Saving Feed in offline storage');
    }
    console.log(tempArr);

    return tempArr;
  };
}

export default new FeedFetcher();
