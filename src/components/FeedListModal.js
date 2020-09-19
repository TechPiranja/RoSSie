import { Button, Card, Modal } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const FeedListModal = ({ visible, onBackdropPress, setNewFeedLink, newFeedLink, save }) => {
	return (
		<Modal
			style={styles.container}
			width="80%"
			visible={visible}
			backdropStyle={styles.backdrop}
			onBackdropPress={onBackdropPress}
		>
			<Card disabled={true}>
				<TextInput
					style={styles.textInput}
					placeholder="https://www.FeedLink.xml"
					onChangeText={(text) => setNewFeedLink(text)}
					value={newFeedLink}
				/>
				<Button style={styles.buttons} onPress={() => save(newFeedLink)}>
					Add Feed
				</Button>
			</Card>
		</Modal>
	);
};

const styles = StyleSheet.create({
	textInput: {
		borderColor: "transparent",
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		textAlign: "center",
		backgroundColor: "#eee",
	},
	buttons: {
		margin: 15,
		height: 20,
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

export default FeedListModal;
