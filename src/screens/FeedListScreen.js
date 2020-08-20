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

	const clearAppData = async () => {
		FeedFetcher.clearAppData;
		setFeedList(() => []);
	};

	//https://www.fitness-fokus.de/feed/
	return (
		<View style={styles.description}>
			<View style={styles.test}>
				<View style={styles.rowContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="https://www.FeedLink.xml"
						onChangeText={(text) => onChangeText(text)}
						value={newFeedLink}
					/>
					<Button title="Add Feed" onPress={() => save(newFeedLink)} />
				</View>
				<View>
					<FlatList
						style={styles.feedList}
						data={feedList}
						renderItem={({ item }) => {
							return <Button title={item} onPress={() => FeedFetcher.changeFeedLink(item)} />;
						}}
						keyExtractor={(item, index) => index.toString()}
					/>
					<Button title="Delete all Links" onPress={deleteAllLinks} />
					<Button title="Clear Offline Storage" onPress={clearAppData} />
				</View>
			</View>

			<BottomNavBar index={0} navigation={navigation} style={styles.bottomNav} />
		</View>
	);
};

const styles = StyleSheet.create({
	feedList: {
		backgroundColor: "#fff",
		marginHorizontal: 10,
		borderRadius: 10,
		height: "80%",
	},
	description: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	test: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 10,
	},
	textInput: {
		height: 30,
		borderColor: "transparent",
		borderWidth: 1,
		borderRadius: 10,
		padding: 5,
		textAlign: "center",
		width: "70%",
		backgroundColor: "#fff",
	},
	buttons: {
		backgroundColor: "#fff",
	},
});

export default FeedListScreen;
