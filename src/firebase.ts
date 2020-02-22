import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-firebase-b4a03.firebaseapp.com",
  databaseURL: "https://react-firebase-b4a03.firebaseio.com",
  projectId: "react-firebase-b4a03",
  storageBucket: "react-firebase-b4a03.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: "1:116745047981:web:c8e881beab89dcf34edb24",
  measurementId: "G-75MNPTDZ1Y"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
