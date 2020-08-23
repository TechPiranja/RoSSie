import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import FeedDetail from "../components/FeedDetail";
import { Layout, TopNavigation, TopNavigationAction, Icon } from "@ui-kitten/components";

const FeedDetailScreen = ({ route, navigation }) => {
	const { result } = route.params;

	const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
	const BackAction = () => <TopNavigationAction icon={BackIcon} onPressOut={() => navigation.navigate("Feed")} />;

	return (
		<Layout style={{ flex: 1 }}>
			<SafeAreaView>
				<TopNavigation title="FeedList" alignment="center" accessoryLeft={BackAction} />
				<View style={styles.description}>
					<FeedDetail result={result} />
				</View>
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	description: {
		backgroundColor: "#ddd",
		margin: 10,
	},
	time: {
		color: "gray",
	},
});

export default FeedDetailScreen;
