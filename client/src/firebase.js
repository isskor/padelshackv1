// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from 'firebase/app';
import 'firebase/auth';
// firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyAcPTr2FRDUCxhJ9hcgJ3FB5ZH8Y9znJdE',
  authDomain: 'mernshop-469f9.firebaseapp.com',
  projectId: 'mernshop-469f9',
  storageBucket: 'mernshop-469f9.appspot.com',
  messagingSenderId: '159108204861',
  appId: '1:159108204861:web:dbdfc118197c657d769d54',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Your web app's Firebase configuration
