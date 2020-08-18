import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const FeedDetailScreen = ({ navigation }) => {
	return (
		<View style={styles.description}>
			<Text>test</Text>
			<BottomNavBar index={0} navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	description: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	time: {
		color: "gray",
	},
});

export default FeedDetailScreen;
