import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FeedFetcher from "../service/FeedFetcher";
import {
	Button,
	Card,
	Modal,
	Text,
	TopNavigation,
	Layout,
	Divider,
	TopNavigationAction,
	Icon,
} from "@ui-kitten/components";
import { auth } from "firebase";
import Validator from "../service/Validation";
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import { SwipeListView } from "react-native-swipe-list-view";

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

	const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={() => setVisible(true)} />;

	const BackIcon = (props) => <Icon {...props} name="plus-outline" />;

	return (
		<Layout style={{ flex: 1 }}>
			<SafeAreaView style={styles.description}>
				<TopNavigation title="FeedList" alignment="center" accessoryRight={BackAction} />
				<View style={styles.innerContainer}>
					<Modal
						width="80%"
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
					<View style={styles.container}>
						{feedList?.length == 0 ? (
							<View style={styles.feedList}>
								<EmptyPlaceholder
									firstText="Empty feed list"
									secondText="You can enter a feed link with the button above"
								/>
							</View>
						) : (
							<SwipeListView
								disableRightSwipe
								style={styles.feedList}
								data={feedList}
								renderItem={({ item }) => {
									return (
										<View>
											<Divider />
											<Button
												style={styles.btn}
												appearance="ghost"
												onPress={() => FeedFetcher.changeFeedLink(item)}
											>
												{item}
											</Button>
										</View>
									);
								}}
								renderHiddenItem={(data) => (
									<View style={styles.rowBack}>
										<View style={[styles.backRightBtn, styles.backRightBtnRight]}>
											<TouchableOpacity
												onPress={async () => {
													let indexToDelete = feedList.indexOf(data.item);
													console.log(indexToDelete);
													setFeedList(() =>
														feedList.filter((x, index) => index != indexToDelete)
													);
													FeedFetcher.save(
														"FeedList",
														feedList.filter((x, index) => index != indexToDelete)
													);
													let link = await FeedFetcher.getCurrentFeedLink();
													await FeedFetcher.removeFeed(link);
												}}
												style={styles.backTextWhite}
											>
												<Text>Delete</Text>
											</TouchableOpacity>
										</View>
									</View>
								)}
								rightOpenValue={-75}
								keyExtractor={(item, index) => index.toString()}
							/>
						)}
						{/* <Button style={styles.buttons} onPress={clearAppData}>
							Clear Offline Storage
						</Button> */}
					</View>
				</View>
				<BottomNavBar index={0} navigation={navigation} style={styles.bottomNav} />
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "white",
		borderRadius: 0,
	},
	container: {
		flex: 1,
	},
	backTextWhite: {
		color: "#FFF",
	},
	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},
	backRightBtnRight: {
		backgroundColor: "red",
		right: 0,
	},
	rowBack: {
		alignItems: "center",
		backgroundColor: "red",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15,
	},
	feedList: {
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
		borderColor: "transparent",
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		textAlign: "center",
		backgroundColor: "#eee",
	},
	buttons: {
		margin: 15,
		height: 20,
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

export default FeedListScreen;
