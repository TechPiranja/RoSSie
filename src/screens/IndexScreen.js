import React, { useState } from "react";
import axios from "axios";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FeedOverview from "../components/FeedOverview";
import { registerForPushNotificationsAsync } from "../service/pushNotification";

const IndexScreen = () => {
	const [articles, setarticles] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchData().then(() => {
			setRefreshing(false);
		});
	});

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
						description: element.description[0],
					},
				]);
			});
		});
	};

	return (
		<ScrollView
			style={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
		>
			{articles[0] == null && <Button onPress={() => fetchData()} title="Get Newsfeed: OTH-AW" />}
			<FlatList
				data={articles}
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
