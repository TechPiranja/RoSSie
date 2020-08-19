import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, AsyncStorage, Button } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { FlatList, TextInput } from "react-native-gesture-handler";

const FeedListScreen = ({ navigation }) => {
	const [feedList, setFeedList] = useState([]);
	const [newFeedLink, onChangeText] = React.useState("");

	useEffect(() => {
		loadFeedListFromStorage();
		console.log("loaded...");
	}, []);

	const loadFeedListFromStorage = async () => {
		let jsonValue = await AsyncStorage.getItem("FeedList");
		console.log("load: " + jsonValue);
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) return;
		jsonValue.forEach((element) => {
			setFeedList((oldArray) => [...oldArray, element]);
		});
	};

	const save = async (value) => {
		setFeedList((oldArray) => [...oldArray, value]);
		try {
			let jsonValue = JSON.stringify(feedList);
			await AsyncStorage.setItem("FeedList", jsonValue);
			console.log("Trying to save: " + jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
	};


	//https://www.fitness-fokus.de/feed/
	return (
		<View style={styles.description}>
			<TextInput
				style={styles.textInput}
				placeholder="https://www.FeedLink.xml"
				onChangeText={(text) => onChangeText(text)}
				value={newFeedLink}
			/>
			<Button title="Add Feed" onPress={() => save(newFeedLink)} />
			<FlatList
				data={feedList}
				renderItem={({ item }) => {
					return <Button title={item} onPress={() => changeFeedLink(item)} />;
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
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
	textInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		margin: 5,
		borderRadius: 5,
		padding: 5,
		textAlign: "center",
	},
});

export default FeedListScreen;
