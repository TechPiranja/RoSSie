import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {View} from 'react-native';

const PinPoint = (props) => <Icon {...props} name="pin-outline" />;
const Home = (props) => <Icon {...props} name="home-outline" />;
const Settings = (props) => <Icon {...props} name="settings-outline" />;

const NavigateToScreen = (index, navigation) => {
  switch (index) {
    case 0:
      navigation.navigate('FeedList');
      break;
    case 1:
      navigation.navigate('Feed');
      break;
    case 2:
      navigation.navigate('Settings');
      break;
  }
};

const BottomNavBar = ({navigation, index}) => {
  return (
    <View>
      <BottomNavigation
        selectedIndex={index}
        appearance="noIndicator"
        onSelect={(i) => NavigateToScreen(i, navigation)}>
        <BottomNavigationTab title="FeedList" icon={PinPoint} />
        <BottomNavigationTab title="Feed" icon={Home} />
        <BottomNavigationTab title="Settings" icon={Settings} />
      </BottomNavigation>
    </View>
  );
};

export default BottomNavBar;
