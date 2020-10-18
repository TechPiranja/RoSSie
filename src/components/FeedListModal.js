import {Button, Card, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onBackdropPress}>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.viewContainer}>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {flex: 1, justifyContent: 'center', padding: 5},
  container: {
    flex: 1,
    justifyContent: 'center',
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
