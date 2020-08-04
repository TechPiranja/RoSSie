import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, RefreshControl, StyleSheet, Button, AsyncStorage } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";

const IndexScreen = () => {
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
		loadXmlToFeed(jsonValue);
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
		var parseString = require("react-native-xml2js").parseString;
		parseString(value.data, function (err, result) {
			var obj = JSON.stringify(result);
			var data = JSON.parse(obj);

			data.rss.channel[0].item.forEach((element) => {
				setFeed((oldArray) => [
					...oldArray,
					{
						title: element.title[0],
						time: element.pubDate,
						link: element.link,
						description: element.description[0],
					},
				]);
			});
		});
	};

	//registerForPushNotificationsAsync();
	const fetchData = async () => {
		const response = await axios.get("https://www.oth-aw.de/rss-schwarzesbrett.xml");
		loadXmlToFeed(response);
		save(response);
	};

	return (
		<ScrollView
			style={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
		>
			{feed[0] == null && <Button onPress={() => fetchData()} title="Get Newsfeed: OTH-AW" />}
			<FlatList
				data={feed}
				renderItem={({ item }) => {
					return <FeedOverview result={item} />;
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
});

export default IndexScreen;
