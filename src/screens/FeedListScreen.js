import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, SafeAreaView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FeedFetcher from "../service/FeedFetcher";
import { Button, Card, Modal, Text, TopNavigation, Layout } from "@ui-kitten/components";
import { auth } from "firebase";
import Validator from "../service/Validation";
import EmptyPlaceholder from "../components/EmptyPlaceholder";

const FeedListScreen = ({ navigation }) => {
	const [feedList, setFeedList] = useState([]);
	const [newFeedLink, onChangeText] = useState("");
	const [visible, setVisible] = React.useState(false);

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
		if (!Validator.validURL(value)) return;

		try {
			let jsonValue = JSON.stringify([...feedList, value]);
			await AsyncStorage.setItem("FeedList", jsonValue);
			console.log("Trying to save: " + jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
		setFeedList((oldArray) => [...oldArray, value]);
		console.log(value);
		setVisible(false);
	};

	const deleteAllLinks = async () => {
		setFeedList(() => []);
		await AsyncStorage.setItem("FeedList", "");
	};

	const clearAppData = async () => {
		FeedFetcher.clearAppData;
		setFeedList(() => []);
	};

	return (
		<Layout style={{ flex: 1 }}>
			<SafeAreaView style={styles.description}>
				<TopNavigation title="FeedList" alignment="center" />
				<View style={styles.innerContainer}>
					<Button style={styles.buttons} onPress={() => setVisible(true)}>
						Add Feed
					</Button>

					<Modal
						width="70%"
						visible={visible}
						backdropStyle={styles.backdrop}
						onBackdropPress={() => setVisible(false)}
					>
						<Card disabled={true}>
							<TextInput
								style={styles.textInput}
								placeholder="https://www.FeedLink.xml"
								onChangeText={(text) => onChangeText(text)}
								value={newFeedLink}
							/>
							<Button style={styles.buttons} onPress={() => save(newFeedLink)}>
								Add Feed
							</Button>
						</Card>
					</Modal>
					<View>
						{feedList?.length == 0 ? (
							<View style={styles.feedList}>
								<EmptyPlaceholder
									firstText="Empty feed list"
									secondText="You can enter a feed link with the button above"
								/>
							</View>
						) : (
							<FlatList
								style={styles.feedList}
								data={feedList}
								renderItem={({ item }) => {
									return (
										<Button appearance="ghost" onPress={() => FeedFetcher.changeFeedLink(item)}>
											{item}
										</Button>
									);
								}}
								keyExtractor={(item, index) => index.toString()}
							/>
						)}
						<Button style={styles.buttons} onPress={clearAppData}>
							Clear Offline Storage
						</Button>
					</View>
				</View>
				<BottomNavBar index={0} navigation={navigation} style={styles.bottomNav} />
			</SafeAreaView>
		</Layout>
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
	innerContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: "#eee",
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
		margin: 10,
		width: "auto",
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

export default FeedListScreen;
