import React, { useState, useEffect } from "react";
import { RefreshControl, StyleSheet, AsyncStorage, SafeAreaView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";
import BottomNavBar from "../components/BottomNavBar";
import FeedFetcher from "../service/FeedFetcher";
import { useIsFocused } from "@react-navigation/native";
import { TopNavigation, Layout, Spinner } from "@ui-kitten/components";
import Validator from "../service/Validation";
import EmptyPlaceholder from "../components/EmptyPlaceholder";

const FeedScreen = ({ navigation }) => {
	const [feed, setFeed] = useState([]);
	const [loadedFeedLink, setLoadedFeedLink] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [fetching, setFetching] = useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		load();
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData().then(() => {
			setRefreshing(false);
		});
	});

	useEffect(() => {
		async function hasFeedLinkChanged() {
			console.log("checking link from feedfetcher");
			if (!Validator.validURL(await FeedFetcher.getCurrentFeedLink())) return;
			else if (loadedFeedLink !== (await FeedFetcher.getCurrentFeedLink().toString())) {
				let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
				setLoadedFeedLink(currentFeedLink.toString());
			}
			console.log("Focused, loadedFeedLink: " + loadedFeedLink);
		}
		hasFeedLinkChanged();
	}, [isFocused]);

	useEffect(() => {
		console.log("checking loaded feed link");
		if (Validator.validURL(loadedFeedLink)) {
			setFeed((oldArray) => []);
			fetchData();
			console.log("loadedFeedLink changed!");
		}
	}, [loadedFeedLink]);

	const load = async () => {
		let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
		console.log("checking feed link before loading");
		if (!Validator.validURL(currentFeedLink)) return;

		setLoadedFeedLink(currentFeedLink);
		console.log("awaited feed link: " + currentFeedLink);
		let jsonValue = await AsyncStorage.getItem("FeedData" + currentFeedLink);
		console.log("is feed empty? : " + feed);
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) return;
		jsonValue.forEach((element) => {
			if (!feed.some((e) => e.title === element.title)) setFeed((oldArray) => [...oldArray, element]);
		});
		console.log("loaded");
	};

	const fetchData = async () => {
		setFetching(true);
		let data = await FeedFetcher.fetchData();
		loadXmlToFeed(data);
		let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
		console.log("checking link in fetch data currentFeedLink");
		if (Validator.validURL(currentFeedLink)) {
			setLoadedFeedLink(currentFeedLink);
			FeedFetcher.save("FeedData" + currentFeedLink, feed);
		}
		setFetching(false);
	};

	const loadXmlToFeed = async (value) => {
		let tempArr = [];
		var parseString = require("react-native-xml2js").parseString;
		parseString(value.data, function (err, result) {
			var obj = JSON.stringify(result);

			if (obj == undefined) {
				console.log("data was undefined!");
				return;
			}
			var data = JSON.parse(obj);

			data.rss.channel[0].item.forEach((element) => {
				let obj = {
					title: element.title[0],
					time: element.pubDate,
					link: element.link,
					description: element.description[0],
				};

				if (!feed.some((e) => e.title == obj.title) && !tempArr.some((e) => e.title == obj.title))
					tempArr.push(obj);
			});
		});

		setFeed((oldArray) => [...tempArr, ...oldArray]);

		console.log("reloaded");
	};

	//registerForPushNotificationsAsync(); <Button title="Delete Feed" onPress={() => setFeed((oldArray) => [])} />

	return (
		<Layout style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<TopNavigation title="Feed" alignment="center" />
				{feed?.length == 0 ? (
					fetching ? (
						<Layout style={styles.centered}>
							<Spinner size="giant" />
							<Text style={{ color: "#999", margin: 10 }}>Loading</Text>
						</Layout>
					) : (
						<EmptyPlaceholder
							firstText="No feed link provided"
							secondText="Please add a link inside the FeedList Menu"
						/>
					)
				) : (
					<FlatList
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
						data={feed}
						renderItem={({ item }) => {
							return <FeedOverview result={item} navigation={navigation} />;
						}}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
				<BottomNavBar index={1} navigation={navigation} />
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	centered: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
});

export default FeedScreen;
