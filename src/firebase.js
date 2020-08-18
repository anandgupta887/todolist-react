import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBdzuUOE2BXN-hlY8mRCLTvHpC7t_1A11I",
  authDomain: "todolist-b70bb.firebaseapp.com",
  databaseURL: "https://todolist-b70bb.firebaseio.com",
  projectId: "todolist-b70bb",
  storageBucket: "todolist-b70bb.appspot.com",
  messagingSenderId: "55188204946",
  appId: "1:55188204946:web:fd485653a38b6ff59d654b",
  measurementId: "G-PSZ41P9ZJ0",
});

const db = firebaseApp.firestore();

export default db;
