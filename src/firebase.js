import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //   Your Firbase Config here
});

const db = firebaseApp.firestore();

export default db;
