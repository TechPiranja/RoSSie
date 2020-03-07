import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import FeedDetailScreen from './src/screens/FeedDetailScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    FeedDetail: FeedDetailScreen
  },
  {
    InitialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'RoSSie'
    }
  }
);

export default createAppContainer(navigator);
