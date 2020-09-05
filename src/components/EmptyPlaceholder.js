import React from "react";
import { View, StyleSheet, Text } from "react-native";

const EmptyPlaceholder = ({ navigation, index }) => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>No feed link provided.</Text>
				<Text style={styles.text}>Please add a link in the FeedList Menu.</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		backgroundColor: "#ddd",
		borderRadius: 10,
		padding: 10,
	},
	text: {
		textAlign: "center",
	},
});

export default EmptyPlaceholder;
