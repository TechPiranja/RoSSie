import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyASZasZYLaN_0PXAq521nmcMoRXLIjyol8',
        authDomain: 'rossie-ef094.firebaseapp.com',
        databaseURL: 'https://rossie-ef094.firebaseio.com',
        projectId: 'rossie-ef094',
        storageBucket: 'rossie-ef094.appspot.com',
        messagingSenderId: '791546510379',
        appId: '1:791546510379:web:2c4e7ff035a9c0d5c0be6e',
        measurementId: 'G-PYF866NHWN'
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      };
      this.db.push(message);
    });
  };

  parse = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return { _id, createdAt, text, user };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
