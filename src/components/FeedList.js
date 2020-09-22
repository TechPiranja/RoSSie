import { Divider, Button } from "@ui-kitten/components";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import FeedFetcher from "../service/FeedFetcher";

const deleteFeedItem = async (data, feedList, setFeedList) => {
	let indexToDelete = feedList.indexOf(data.item);
	setFeedList(indexToDelete);
	FeedFetcher.save(
		"FeedList",
		feedList.filter((x, index) => index != indexToDelete)
	);
	let link = await FeedFetcher.getCurrentFeedLink();
	await FeedFetcher.removeFeed(link);
};



const FeedList = ({ feedList, setFeedList, changeFeedLink }) => {
	return (
		<SwipeListView
			disableRightSwipe
			style={styles.list}
			data={feedList}
			renderItem={({ item }) => {
				return (
					<View>
						<Divider />
						<Button style={styles.btn} appearance="ghost" onPress={() => changeFeedLink(item)}>
							{item}
						</Button>
					</View>
				);
			}}
			renderHiddenItem={(data) => (
				<View style={styles.rowBack}>
					<View style={[styles.backRightBtn, styles.backRightBtnRight]}>
						<TouchableOpacity
							onPress={() => deleteFeedItem(data, feedList, setFeedList)}
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
	);
};

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "white",
		borderRadius: 0,
	},
	list: {
		height: "80%",
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
	backTextWhite: {
		color: "#FFF",
	},
});

export default FeedList;
