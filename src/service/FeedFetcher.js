import axios from "axios";
import { AsyncStorage } from "react-native";

class FeedFetcher {
	constructor() {
		this.init();
	}

	init = () => {
		// TODO: load last FeedLink
	};

	fetchData = async () => {
		//https://www.fitness-fokus.de/feed/
		//https://www.oth-aw.de/rss-schwarzesbrett.xml
		const response = await axios.get("https://www.fitness-fokus.de/feed/");
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

	changeFeedLink = async (value) => {};
}

export default new FeedFetcher();
