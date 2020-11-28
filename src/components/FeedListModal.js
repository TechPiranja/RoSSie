import { Button, Card, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

let feedIndex = -1;

const FeedListModal = ({ visible, onBackdropPress, save, updateFunc }) => {
  const [FeedLink, setFeedLink] = useState('');
  const [FeedName, setFeedName] = useState('');
  const [saveTitle, setSaveTitle] = useState('');

  const saveInput = () => {
    let feedItem = {
      name: FeedName,
      link: FeedLink,
    };
    save(feedItem, feedIndex);
  };

  const load = (name, link, saveTitle, index) => {
    if (index !== feedIndex || index !== -1) {
      setFeedLink(link);
      setFeedName(name);
    }
    setSaveTitle(saveTitle);
    feedIndex = index;
    console.log('modal loaded', name, link, saveTitle, index);
  }

  updateFunc(load);

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onBackdropPress}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.viewContainer}>
            <Card disabled={true}>
              <Text style={styles.label}>Feed Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="My Feed"
                placeholderTextColor="grey"
                onChangeText={(text) => setFeedName(text)}
                value={FeedName}
              />
              <Text style={styles.label}>Feedlink:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="https://www.FeedLink.xml"
                placeholderTextColor="grey"
                onChangeText={(text) => setFeedLink(text)}
                value={FeedLink}
              />
              <Button
                appearance="ghost"
                style={styles.buttons}
                onPress={() => saveInput()}>
                {saveTitle}
              </Button>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    marginBottom: 5,
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
