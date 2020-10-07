import {Button, Card, Modal, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const FeedListModal = ({visible, onBackdropPress, save}) => {
  const [FeedLink, setFeedLink] = useState('');
  const [FeedName, setFeedName] = useState('');

  const saveInput = () => {
    let feedItem = {
      name: FeedName,
      link: FeedLink,
    };
    save(feedItem);
  };

  return (
    <Modal
      style={styles.container}
      width="80%"
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onBackdropPress}>
      <Card disabled={true}>
        <Text style={styles.label}>Feed Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="My Feed"
          onChangeText={(text) => setFeedName(text)}
          value={FeedName}
        />
        <Text style={styles.label}>Feedlink:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="https://www.FeedLink.xml"
          onChangeText={(text) => setFeedLink(text)}
          value={FeedLink}
        />
        <Button
          appearance="ghost"
          style={styles.buttons}
          onPress={() => saveInput()}>
          Add Feed
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#eee',
  },
  buttons: {
    margin: 15,
    height: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default FeedListModal;
