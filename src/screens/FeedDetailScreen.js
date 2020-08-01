import React from "react";
import { View, StyleSheet } from "react-native";
import FeedDetail from "../components/FeedDetail";

const FeedDetailScreen = ({ navigation }) => {
	const result = navigation.getParam("result");
	return (
		<View style={styles.description}>
			<FeedDetail result={result} />
		</View>
	);
};

const styles = StyleSheet.create({
	description: {
		backgroundColor: "#FFF",
		padding: 10,
	},
	time: {
		color: "gray",
	},
});

export default FeedDetailScreen;
