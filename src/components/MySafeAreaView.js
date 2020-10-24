import {Layout} from '@ui-kitten/components';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MySafeAreaView = ({children}) => {
  if (Platform.OS === 'ios') {
    return (
      <Layout style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <>
            <StatusBar barStyle="dark-content" translucent />
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
          barStyle="dark-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        {children}
      </Layout>
    );
  }
};
export default MySafeAreaView;
