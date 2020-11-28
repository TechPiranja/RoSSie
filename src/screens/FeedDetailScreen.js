/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeedDetail from '../components/FeedDetail';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import MySafeAreaView from '../components/MySafeAreaView';
import ThemeSelector from '../services/ThemeSelector';

const FeedDetailScreen = ({ route, navigation }) => {
  const { result } = route.params;

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPressOut={() => navigation.navigate('Feed')}
    />
  );

  return (
    <Layout style={{ flex: 1 }}>
      <MySafeAreaView>
        <TopNavigation
          title={result.feedName}
          alignment="center"
          accessoryLeft={BackAction}
        />
        <View style={styles.description}>
          <FeedDetail result={result} />
        </View>
      </MySafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  description: {
    margin: 0,
  },
});
export default FeedDetailScreen;
