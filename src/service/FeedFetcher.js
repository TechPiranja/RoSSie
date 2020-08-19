import axios from "axios";
import { AsyncStorage } from "react-native";

class FeedFetcher {
	constructor() {
		this.currentFeedLink = "https://www.oth-aw.de/rss-schwarzesbrett.xml";
	}

	//https://www.fitness-fokus.de/feed/
	fetchData = async () => {
		const response = await axios.get(this.currentFeedLink);
		console.log("fetched data" + response);
		return response;
	};

	save = async (key, value) => {
		try {
			let jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (e) {
			console.log("Error: " + e);
		}
	};

	changeFeedLink = async (value) => {
		this.currentFeedLink = value;
	};
}

export default new FeedFetcher();
