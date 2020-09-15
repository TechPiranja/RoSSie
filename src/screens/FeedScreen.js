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

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData().then(() => {
			setRefreshing(false);
		});
	});

	useEffect(() => {
		async function hasFeedLinkChanged() {
			console.log("checking link from feedfetcher");
			let currentLink = await FeedFetcher.getCurrentFeedLink();
			if (!Validator.validURL(currentLink) || currentLink == "") return;
			else if (loadedFeedLink !== (await FeedFetcher.getCurrentFeedLink().toString())) {
				let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
				load();

				setLoadedFeedLink(currentFeedLink.toString());
				console.log("Focused, loadedFeedLink: " + currentFeedLink);
			}
		}
		hasFeedLinkChanged();
	}, [isFocused]);

	useEffect(() => {
		console.log("loadedFeedLink and feed changed!");
	}, [loadedFeedLink]);

	const load = async () => {
		let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
		console.log("checking feed link before loading from offline storage");
		if (!Validator.validURL(currentFeedLink)) return;

		console.log("awaited feed link: " + currentFeedLink);
		let jsonValue = await AsyncStorage.getItem("FeedData" + currentFeedLink);
		console.log("is feed empty? : " + feed);
		console.log("offline data is: ");
		console.log(JSON.parse(jsonValue));
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) {
			console.log("Feed was not inside offline storage");
			onRefresh();
			return;
		}

		let tempArr = [];
		jsonValue.forEach((element) => {
			if (!tempArr.some((e) => e.title === element.title)) tempArr = [...tempArr, element];
		});

		setFeed(() => [...tempArr]);
		console.log("loaded");
	};

	const fetchData = async () => {
		console.log("fetching data...");
		setFetching(true);
		let data = await FeedFetcher.fetchData();
		let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
		let isReload = currentFeedLink !== loadedFeedLink ? false : true;
		console.log("currentfeedlink: " + currentFeedLink + " and loadedFeedLink: " + loadedFeedLink);
		await loadXmlToFeed(data, isReload);
		setFetching(false);
	};

	const loadXmlToFeed = async (value, isReload) => {
		let tempArr = [];
		let rssData = [];
		var parseString = require("react-native-xml2js").parseString;
		parseString(value.data, function (err, result) {
			var obj = JSON.stringify(result);
			if (obj == undefined) {
				console.log("data was undefined!");
				return;
			}
			var data = JSON.parse(obj);
			rssData.push({
				title: "test",
				time: "test",
				link: "element.link",
				description: "element.description[0]",
			});
			data.rss.channel[0].item.forEach((element) => {
				let obj = {
					title: element.title[0],
					time: element.pubDate,
					link: element.link,
					description: element.description[0],
				};
				rssData.push(obj);
			});
		});

		let filteredList = rssData.filter((x) => feed.some((y) => y.time === x.time && y.title === x.title));
		if (isReload && filteredList.length === feed.length) {
			console.log("is same so return");
			return;
		}

		rssData.forEach((obj) => {
			if (isReload && !feed.some((e) => e.title == obj.title) && !tempArr.some((e) => e.title == obj.title))
				tempArr.push(obj);
			else if (!tempArr.some((e) => e.title == obj.title)) tempArr.push(obj);
		});

		console.log("reloaded");
		let currentFeedLink = await FeedFetcher.getCurrentFeedLink();
		setFeed(() => [...tempArr]);
		console.log("checking link in fetch data currentFeedLink");
		if (Validator.validURL(currentFeedLink)) {
			//setLoadedFeedLink(currentFeedLink);
			await FeedFetcher.save("FeedData" + currentFeedLink, tempArr);
			console.log("Saving Feed in offline storage");
		}
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
