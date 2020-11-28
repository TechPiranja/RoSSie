/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Layout, TopNavigation, Button, Divider } from '@ui-kitten/components';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import FeedFetcher from '../services/FeedFetcher';
import Toast from 'react-native-tiny-toast';
import MySafeAreaView from '../components/MySafeAreaView';
import ThemeSelector from '../services/ThemeSelector';
import { ThemeContext } from '../../theme-context';

const SettingsScreen = ({ navigation }) => {
  const [checkedOfflineMode, setCheckedOfflineMode] = React.useState(false);
  const [checkedMobileDataMode, setCheckedMobileDataMode] = React.useState(
    false,
  );
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(ThemeSelector.getDarkModeEnabled());
  const [styles, setStyles] = React.useState(darkModeEnabled === true ? darkStyles : lightStyles);

  const onCheckedOfflineMode = (isChecked) => {
    setCheckedOfflineMode(isChecked);
  };
  const onCheckedMobileDataMode = (isChecked) => {
    setCheckedMobileDataMode(isChecked);
  };

  const themeContext = React.useContext(ThemeContext);
  const onDarkModeValueChanged = (enabled) => {
    ThemeSelector.setDarkModeEnabled(enabled);
    setDarkModeEnabled(enabled);
    setStyles(enabled === true ? darkStyles : lightStyles);
    themeContext.set(enabled);
    lastDarkModeEnabled = enabled;
  };


  return (
    <Layout style={{ flex: 1 }}>
      <MySafeAreaView style={styles.container}>
        <TopNavigation title="Settings" alignment="center" />
        <ScrollView style={styles.outerContainer}>
          <Text style={styles.headerText}>Storage</Text>
          <View style={styles.block}>
            <Button
              appearance="ghost"
              style={styles.btn}
              onPress={() => {
                FeedFetcher.clearOfflineFeedStorage(),
                  Toast.showSuccess('Cleared offline Feed Storage!', {
                    position: Toast.position.CENTER,
                    duration: 1500,
                  });
              }}>
              <Text style={styles.text}>Delete Offline Feed Storage</Text>
            </Button>
            <Divider />
            <Button
              appearance="ghost"
              style={styles.btn}
              onPress={() => {
                FeedFetcher.clearFeedLinkListFromStorage(),
                  Toast.showSuccess('Cleared Feedlink Storage!', {
                    position: Toast.position.CENTER,
                    duration: 1500,
                  });
              }}>
              <Text style={styles.text}>Delete all FeedLinks</Text>
            </Button>
            <Divider />
            <Button
              appearance="ghost"
              style={styles.btn}
              onPress={() => {
                FeedFetcher.clearAppData(),
                  Toast.showSuccess('Cleared App Data!', {
                    position: Toast.position.CENTER,
                    duration: 1500,
                  });
              }}>
              <Text style={styles.text}>Clear App Cache</Text>
            </Button>
          </View>
          {/* <Text style={{ margin: 10, marginTop: 20 }}>Download</Text>
					<View style={styles.block}>
						<View style={styles.rowContainer}>
							<Text style={styles.text}>Offline Mode</Text>
							<Toggle checked={checkedOfflineMode} onChange={onCheckedOfflineMode}></Toggle>
						</View>
						<Divider />
						<View style={styles.rowContainer}>
							<Text style={styles.text}>Download with mobile data</Text>
							<Toggle checked={checkedMobileDataMode} onChange={onCheckedMobileDataMode}></Toggle>
						</View>
					</View>

					<Text style={{ margin: 10, marginTop: 20 }}>Main</Text>
					<View style={styles.block}>
						<Button appearance="ghost" style={styles.btn}>
							<Text style={styles.text}>Reset Settings</Text>
						</Button>
					</View> */}
          <Text style={styles.headerText}>Theme</Text>
          <View stlye={styles.block}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>Enable Dark Theme</Text>
              <Switch value={darkModeEnabled} onValueChange={onDarkModeValueChanged}></Switch>
            </View>
          </View>
        </ScrollView>

        <BottomNavBar index={2} navigation={navigation} />
      </MySafeAreaView>
    </Layout>
  );
};

const lightStylesProto = {
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  block: {
    backgroundColor: '#fff',
  },
  headerText: {
    color: 'black',
    margin: 10,
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 15,
    textAlign: 'center'
  },
  btn: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  outerContainer: {
    backgroundColor: '#eee',
  },
};
const darkStylesProto = {
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#192033'
  },
  block: {
    backgroundColor: '#222b44',
  },
  headerText: {
    color: 'white',
    margin: 10,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 15,
    textAlign: 'center',
  },
  btn: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#192033',
    borderRadius: 0,
  },
  outerContainer: {
    backgroundColor: '#222b44',
  }
}

const lightStyles = StyleSheet.create(lightStylesProto);
const darkStyles = StyleSheet.flatten([lightStyles, StyleSheet.create(darkStylesProto)]);


export default SettingsScreen;
