import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Dimensions } from "react-native";
import HTML from "react-native-render-html";

const FeedDetail = ({ result }) => {
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>{result.title}</Text>
			<HTML
				html={result.description}
				imagesMaxWidth={Dimensions.get("window").width}
				onLinkPress={(event, url) => Linking.openURL(url)}
			/>
			<View style={styles.bottomContainer}>
				<Text style={styles.time}>Time: {result.time} </Text>
				<TouchableOpacity onPress={() => Linking.openURL(result.link.toString())}>
					<Feather name="external-link" style={styles.iconStyle} />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
	},
	time: {
		position: "absolute",
		bottom: 0,
		color: "gray",
	},
	title: {
		fontWeight: "bold",
		marginBottom: 10,
	},
	iconStyle: {
		fontSize: 25,
		color: "#5e92f3",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	bottomContainer: {
		marginTop: 50,
	},
});

export default FeedDetail;
