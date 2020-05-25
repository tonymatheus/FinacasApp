import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBpMutPkSKNOI3D1euH2pBVqeOtiKnRPAk',
  authDomain: 'meuapp-aeca6.firebaseapp.com',
  databaseURL: 'https://meuapp-aeca6.firebaseio.com',
  projectId: 'meuapp-aeca6',
  storageBucket: 'meuapp-aeca6.appspot.com',
  messagingSenderId: '758343227462',
  appId: '1:758343227462:web:59bccdef20086630e75247',
  measurementId: 'G-NVD1094Y6X',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
