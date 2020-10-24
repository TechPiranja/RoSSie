import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Fire from './Fire';

const PUSH_ENDPOINT = 'https://rossie-ef094.firebaseio.com';

export async function registerForPushNotificationsAsync() {
  const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  Fire.db.ref('users/' + Fire.uid + '/push_token').set(token);
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}
