import axios from "axios";
import { AsyncStorage } from "react-native";
import Validator from "./Validation";

class FeedFetcher {
	getCurrentFeedLink = async () => {
		let currentFeedLink = await AsyncStorage.getItem("CurrentFeedLink");
		return JSON.parse(currentFeedLink);
	};

	fetchData = async () => {
		let currentFeedLink = await this.getCurrentFeedLink();
		const response = await axios.get(currentFeedLink).catch((error) => console.log("FetchData: " + error));
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
		if (Validator.validURL(value)) this.save("CurrentFeedLink", value);
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
