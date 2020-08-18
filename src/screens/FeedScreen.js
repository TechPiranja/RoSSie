import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshControl, StyleSheet, Button, AsyncStorage, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";
import BottomNavBar from "../components/BottomNavBar";

const IndexScreen = ({ navigation }) => {
	const [feed, setFeed] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData().then(() => {
			setRefreshing(false);
		});
	});

	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		let jsonValue = await AsyncStorage.getItem("Feed");
		jsonValue = JSON.parse(jsonValue);
		if (jsonValue == null || jsonValue.length == 0) return;
		jsonValue.forEach((element) => {
			if (!feed.some((e) => e.title === obj.title)) setFeed((oldArray) => [...oldArray, element]);
		});
	};

	const save = async (value) => {
		try {
			let jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("Feed", jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
	};

	const loadXmlToFeed = async (value) => {
		let tempArr = [];

		var parseString = require("react-native-xml2js").parseString;
		parseString(value.data, function (err, result) {
			var obj = JSON.stringify(result);
			var data = JSON.parse(obj);

			data.rss.channel[0].item.forEach((element) => {
				let obj = {
					title: element.title[0],
					time: element.pubDate,
					link: element.link,
					description: element.description[0],
				};

				if (!feed.some((e) => e.title === obj.title) && !tempArr.some((e) => e.title === obj.title))
					tempArr.push(obj);
			});
		});

		setFeed((oldArray) => [...tempArr, ...oldArray]);

		console.log("reloaded");
	};

	//registerForPushNotificationsAsync();
	const fetchData = async () => {
		//https://www.fitness-fokus.de/feed/
		//https://www.oth-aw.de/rss-schwarzesbrett.xml
		const response = await axios.get("https://www.fitness-fokus.de/feed/");
		loadXmlToFeed(response);
		save(feed);
	};

	return (
		<View style={styles.container}>
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

export default IndexScreen;
