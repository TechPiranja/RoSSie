import React, { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";

const IndexScreen = () => {
	const [articles, setarticles] = useState([]);
	//registerForPushNotificationsAsync();
	const fetchData = async () => {
		const response = await axios.get("https://www.oth-aw.de/rss-schwarzesbrett.xml");

		var parseString = require("react-native-xml2js").parseString;
		parseString(response.data, function (err, result) {
			var obj = JSON.stringify(result);
			var data = JSON.parse(obj);

			data.rss.channel[0].item.forEach((element) => {
				setarticles((oldArray) => [
					...oldArray,
					{
						title: element.title[0],
						time: element.pubDate,
						link: element.link,
						description: element.description[0]
							.replace(/<\/p>/g, "")
							.replace(/<p>/g, "")
							.replace(/&uuml;/g, "ü")
							.replace(/&ouml;/g, "ö")
							.replace(/&auml;/g, "ä")
							.replace(/&quot;/g, '"')
							.replace(/<a href="mailto:/g, "")
							.replace(/".*<\/a>/, ""),
					},
				]);
			});
		});
	};

	return (
		<View style={styles.container}>
			<Button onPress={() => fetchData()} title="Get Newsfeed: OTH-AW" />
			<FlatList
				data={articles}
				renderItem={({ item }) => {
					return <FeedOverview result={item} />;
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
});

export default IndexScreen;
