import "react-native-gesture-handler";
import * as React from "react";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./src/screens/FeedScreen";
import FeedListScreen from "./src/screens/FeedListScreen";
import FeedDetailScreen from "./src/screens/FeedDetailScreen";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";

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
			name="FeedList"
			component={FeedListScreen}
			options={{
				headerLeft: () => null,
				animationEnabled: false,
			}}
		/>
	</Navigator>
);
const App = () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
				<NavigationContainer>
					<HomeNavigator></HomeNavigator>
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
};

export default App;
