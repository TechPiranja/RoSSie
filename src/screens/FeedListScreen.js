import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, AsyncStorage, Button } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FeedFetcher from "../service/FeedFetcher";

const FeedListScreen = ({ navigation }) => {
	const [feedList, setFeedList] = useState([]);
	const [newFeedLink, onChangeText] = useState("");

	useEffect(() => {
		loadFeedListFromStorage();
		console.log("loaded...");
	}, []);

	const loadFeedListFromStorage = async () => {
		let jsonValue = await AsyncStorage.getItem("FeedList");
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) return;
		jsonValue.forEach((element) => {
			setFeedList((oldArray) => [...oldArray, element]);
			console.log(element);
		});
	};

	const save = async (value) => {
		try {
			let jsonValue = JSON.stringify([...feedList, value]);
			await AsyncStorage.setItem("FeedList", jsonValue);
			console.log("Trying to save: " + jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
		setFeedList((oldArray) => [...oldArray, value]);
	};

	const deleteAllLinks = async () => {
		setFeedList(() => []);
		await AsyncStorage.setItem("FeedList", "");
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
			<Button title="Delete all Links" onPress={() => deleteAllLinks()} />
			<FlatList
				data={feedList}
				renderItem={({ item }) => {
					return <Button title={item} onPress={() => FeedFetcher.changeFeedLink(item)} />;
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
