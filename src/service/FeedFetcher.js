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

	removeFeed = async (link) => {
		AsyncStorage.removeItem("FeedData" + link);
	};

	loadXmlToFeed = async (value, isReload, feed) => {
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
			data.rss.channel[0].item.forEach((element) => {
				let x = {
					title: element.title[0],
					time: element.pubDate,
					link: element.link,
					description: element.description[0],
				};
				rssData.push(x);
			});
		});

		let filteredList = rssData.filter((x) => !feed.some((y) => y.time === x.time && y.title === x.title));
		console.log(filteredList.length + " and " + feed.length);
		if (isReload && filteredList.length === feed.length) {
			console.log("is same so return");
			return;
		}

		rssData.forEach((obj) => {
			if (isReload && !feed.some((e) => e.title == obj.title) && !tempArr.some((e) => e.title == obj.title))
				tempArr.push(obj);
			else if (!tempArr.some((e) => e.title == obj.title)) tempArr.push(obj);
		});

		let currentFeedLink = await this.getCurrentFeedLink();
		if (Validator.validURL(currentFeedLink)) {
			await this.save("FeedData" + currentFeedLink, tempArr);
			console.log("Saving Feed in offline storage");
		}

		return tempArr;
	};
}

export default new FeedFetcher();
