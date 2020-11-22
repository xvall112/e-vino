import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useForkRef } from "@material-ui/core";

const config = {
  apiKey: "AIzaSyABOr3Vj_-gy7GPoAdRWes2R351oWNwb20",
  authDomain: "evino-30926.firebaseapp.com",
  databaseURL: "https://evino-30926.firebaseio.com",
  projectId: "evino-30926",
  storageBucket: "evino-30926.appspot.com",
  messagingSenderId: "124959067696",
  appId: "1:124959067696:web:565e3a6e996b9863f227f5",
  measurementId: "G-SH7D914J5Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exist) {
    const { displayName, email, photoURL } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
