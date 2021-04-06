import {Layout} from '@ui-kitten/components';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeSelector from '../services/ThemeSelector';

const MySafeAreaView = ({children}) => {
  const statusBarColor = ThemeSelector.getDarkModeEnabled() ? 'light-content' : 'dark-content';
  if (Platform.OS === 'ios') {
    return (
      <Layout style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <>
            <StatusBar barStyle={statusBarColor} translucent />
            {children}
          </>
        </SafeAreaView>
      </Layout>
    );
  }
  if (Platform.OS === 'android') {
    return (
      <Layout style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        <StatusBar
          translucent
          barStyle={statusBarColor}
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        {children}
      </Layout>
    );
  }
};
export default MySafeAreaView;
