import axios from "axios";
import { AsyncStorage } from "react-native";

class FeedFetcher {
	getCurrentFeedLink = async () => {
		let currentFeedLink = await AsyncStorage.getItem("CurrentFeedLink");
		return JSON.parse(currentFeedLink);
	};

	fetchData = async () => {
		let currentFeedLink = await this.getCurrentFeedLink();
		console.log("fetch data: " + currentFeedLink);
		const response = await axios.get(currentFeedLink).catch((error) => console.log(error));

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
		this.save("CurrentFeedLink", value);
	};

	clearAppData = async function () {
		try {
			const keys = await AsyncStorage.getAllKeys();
			await AsyncStorage.multiRemove(keys);
		} catch (error) {
			console.error("Error clearing app data.");
		}
	};
}

export default new FeedFetcher();
