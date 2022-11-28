import firebase from "firebase/app";
import "firebase/database";

const config = {
      apiKey: "AIzaSyBtdXKCep9SXNyUO1xQvsc8GePhRu47vQ4",
  authDomain: "firev-93261.firebaseapp.com",
  projectId: "firev-93261",
  storageBucket: "firev-93261.appspot.com",
  messagingSenderId: "505594105783",
  appId: "1:505594105783:web:1a756236c3534851d8a232",
  databaseURL: "https://firev-93261-default-rtdb.europe-west1.firebasedatabase.app"
}

const db = firebase.initializeApp(config);
export default db;