import "react-native-gesture-handler";
import * as React from "react";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./src/screens/FeedScreen";
import FeedListScreen from "./src/screens/FeedListScreen";
import FeedDetailScreen from "./src/screens/FeedDetailScreen";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
	<Navigator>
		<Screen
			name="Feed"
			component={FeedScreen}
			options={{
				headerLeft: () => null,
				animationEnabled: false,
				headerStyle: { backgroundColor: "#00acc1" },
				headerTintColor: "#fff",
			}}
		/>
		<Screen
			name="FeedDetail"
			component={FeedDetailScreen}
			options={{ headerStyle: { backgroundColor: "#00acc1" }, headerTintColor: "#fff" }}
		/>
		<Screen
			name="FeedList"
			component={FeedListScreen}
			options={{
				headerLeft: () => null,
				animationEnabled: false,
				headerStyle: { backgroundColor: "#00acc1" },
				headerTintColor: "#fff",
			}}
		/>
	</Navigator>
);
const App = () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<NavigationContainer>
					<HomeNavigator />
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
};

export default App;
