import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "./src/screens/IndexScreen";
import FeedDetailScreen from "./src/screens/FeedDetailScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
	<Navigator>
		<Screen
			name="Feeds"
			component={IndexScreen}
			options={{ headerLeft: () => null, headerStyle: { backgroundColor: "#00acc1" }, headerTintColor: "#fff" }}
		/>
		<Screen
			name="FeedDetail"
			component={FeedDetailScreen}
			options={{ headerStyle: { backgroundColor: "#00acc1" }, headerTintColor: "#fff" }}
		/>
	</Navigator>
);
const App = () => {
	return (
		<NavigationContainer>
			<HomeNavigator />
		</NavigationContainer>
	);
};

export default App;
