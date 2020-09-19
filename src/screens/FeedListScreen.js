import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, SafeAreaView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { TopNavigation, Layout, TopNavigationAction, Icon } from "@ui-kitten/components";
import { auth } from "firebase";
import Validator from "../service/Validation";
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import FeedList from "../components/FeedList";
import FeedListModal from "../components/FeedListModal";
import FeedFetcher from "../service/FeedFetcher";
import { useIsFocused } from "@react-navigation/native";

const FeedListScreen = ({ navigation }) => {
	const [feedList, setFeedList] = useState([]);
	const [newFeedLink, setNewFeedLink] = useState("");
	const [visible, setVisible] = React.useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		loadFeedListFromStorage();
	}, []);

	useEffect(() => {
		loadFeedListFromStorage();
	}, [isFocused]);

	async function loadFeedListFromStorage() {
		let feedListFromStorage = await FeedFetcher.loadFeedListFromStorage();
		if (feedListFromStorage == undefined || feedListFromStorage.length == 0) setFeedList([]);
		else setFeedList([...feedListFromStorage]);
	}

	const save = async (value) => {
		if (!Validator.validURL(value)) return;

		try {
			let jsonValue = JSON.stringify([...feedList, value]);
			await AsyncStorage.setItem("FeedList", jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
		setFeedList((oldArray) => [...oldArray, value]);
		setVisible(false);
	};

	const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={() => setVisible(true)} />;

	const BackIcon = (props) => <Icon {...props} name="plus-outline" />;

	const DeleteItemFromFeed = (indexToDelete) => {
		setFeedList(() => feedList.filter((x, index) => index != indexToDelete));
	};

	return (
		<Layout style={{ flex: 1 }}>
			<SafeAreaView style={styles.description}>
				<TopNavigation title="FeedList" alignment="center" accessoryRight={BackAction} />
				<View style={styles.innerContainer}>
					<FeedListModal
						visible={visible}
						onBackdropPress={() => setVisible(false)}
						newFeedLink={newFeedLink}
						setNewFeedLink={(text) => setNewFeedLink(text)}
						save={save}
					/>
					{feedList?.length == 0 ? (
						<EmptyPlaceholder
							firstText="Empty feed list"
							secondText="You can enter a feed link with the button above"
						/>
					) : (
						<FeedList feedList={feedList} setFeedList={DeleteItemFromFeed} />
					)}
				</View>
				<BottomNavBar index={0} navigation={navigation} style={styles.bottomNav} />
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
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
});

export default FeedListScreen;
