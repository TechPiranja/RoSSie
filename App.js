import 'react-native-gesture-handler';
import * as React from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './src/screens/FeedScreen';
import FeedListScreen from './src/screens/FeedListScreen';
import FeedDetailScreen from './src/screens/FeedDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';
import SplashScreen from 'react-native-splash-screen';
import { ThemeContext } from './theme-context';
import ThemeSelector from './src/services/ThemeSelector';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen
      name="Feed"
      component={FeedScreen}
      options={{
        headerLeft: () => null,
        animationEnabled: false,
      }}
    />
    <Screen name="FeedDetail" component={FeedDetailScreen} />
    <Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerLeft: () => null,
        animationEnabled: false,
      }}
    />
    <Screen
      name="FeedList"
      component={FeedListScreen}
      options={{
        headerLeft: () => null,
        animationEnabled: false,
      }}
    />
  </Navigator>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: 'light',
    };
  }

  setTheme = (darkMode) => {
    if (darkMode === true) {
      this.setState({ selectedTheme: 'dark' });
    } else {
      this.setState({ selectedTheme: 'light' });
    }
  };

  componentDidMount() {
    ThemeSelector.loadDarkModeEnabled().then(e => {
      this.setTheme(e);
      SplashScreen.hide();
    });
  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ t: this.state.selectedTheme, set: this.setTheme }}>
          <ApplicationProvider {...eva} theme={{ ...eva[this.state.selectedTheme], ...theme }}>
            <NavigationContainer>
              <HomeNavigator />
            </NavigationContainer>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </>
    );
  }
}
