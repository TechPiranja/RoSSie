import React from "react";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

const PinPoint = (props) => <Icon {...props} name="pin-outline" />;
const Home = (props) => <Icon {...props} name="home-outline" />;

const BottomNavBar = ({ navigation, index }) => {
	return (
		<View>
			<BottomNavigation
				style={Platform.OS === "ios" && { height: 80 }}
				selectedIndex={index}
				appearance="noIndicator"
				selectedIndex={index}
				onSelect={(index) => (index === 0 ? navigation.navigate("FeedList") : navigation.navigate("Feed"))}
			>
				<BottomNavigationTab title="FeedList" icon={PinPoint} />
				<BottomNavigationTab title="Feed" icon={Home} />
			</BottomNavigation>
		</View>
	);
};

const styles = StyleSheet.create({});

export default BottomNavBar;
