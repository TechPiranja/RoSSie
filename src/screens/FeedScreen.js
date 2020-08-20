import React, { useState, useEffect } from "react";
import { RefreshControl, StyleSheet, Button, AsyncStorage, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";
import BottomNavBar from "../components/BottomNavBar";
import FeedFetcher from "../service/FeedFetcher";
import { useIsFocused } from "@react-navigation/native";

const FeedScreen = ({ navigation }) => {
	const [feed, setFeed] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		load();
		console.log("inital load");
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData().then(() => {
			setRefreshing(false);
		});
	});

	useEffect(() => {
		setFeed((oldArray) => []);
		fetchData();
		console.log("used Effect!");
	}, [isFocused]);

	const load = async () => {
		let jsonValue = await AsyncStorage.getItem("FeedData" + FeedFetcher.currentFeedLink);
		console.log("is feed empty? : " + feed);
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) return;
		jsonValue.forEach((element) => {
			if (!feed.some((e) => e.title === element.title)) setFeed((oldArray) => [...oldArray, element]);
		});
	};

	const fetchData = async () => {
		let data = await FeedFetcher.fetchData();
		loadXmlToFeed(data);
		FeedFetcher.save("FeedData" + FeedFetcher.currentFeedLink, feed);
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

	//registerForPushNotificationsAsync();

	return (
		<View style={styles.container}>
			<Button title="Delete Feed" onPress={() => setFeed((oldArray) => [])} />
			<FlatList
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
				ListHeaderComponent={
					feed[0] == null && <Button onPress={() => fetchData()} title="Get Newsfeed: OTH-AW" />
				}
				data={feed}
				renderItem={({ item }) => {
					return <FeedOverview result={item} navigation={navigation} />;
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
			<BottomNavBar index={1} navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
});

export default FeedScreen;
