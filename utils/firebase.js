import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA2TDkMIy68BSR0-JIpgl5H8YXzas1GsRk',
  authDomain: 'inor-b365c.firebaseapp.com',
  projectId: 'inor-b365c',
  storageBucket: 'inor-b365c.appspot.com',
  messagingSenderId: '26985880610',
  appId: '1:26985880610:web:dcc61ef87564d35885be7b',
  measurementId: 'G-9R2K3FV9L7',
};

// initializeApp();
const app = firebase.getApps().length ? firebase.getApp() : firebase.initializeApp(config);

console.log('firebase --------------------------------- ', firebase.getApps());
// export const auth = getAuth(app);

export default app;
export const auth = getAuth(app);
