import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

firebase.initializeApp(config);

export const addOrderToFirestore = async items => {
  const {
    payload: { cartItems, currentUser, total }
  } = items;
  const createAt = new Date();
  const userRef = firestore.collection("users").doc(currentUser.id);
  const ordersRef = firestore.collection("orders");

  await ordersRef
    .add({
      items: cartItems,
      userRef: userRef,
      celkem: total,
      date: createAt
    })
    .then(function(docRef) {
      const newOrdersRef = firestore.collection("orders").doc(docRef.id);
      userRef.update({
        orders: firebase.firestore.FieldValue.arrayUnion({
          orderRef: newOrdersRef
        })
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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

export const addWines = () => {
  const winesRef = firestore.collection("wines");
  try {
    winesRef.add({
      name: "Solaris",
      price: 160,
      obsah: 0.7,
      color: "bílé",
      rocnik: 2020,
      druh: "suche",
      image: ""
    });
  } catch (error) {
    console.log("error creating user", error.message);
  }
};

export const convertWinesSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { name, price, obsah, color, rocnik, druh } = doc.data();

    return {
      name,
      price,
      obsah,
      color,
      rocnik,
      druh,
      id: doc.id
    };
  });
  return transformedCollection;
};

export const convertCollectionAllOrdersToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { celkem, items, userRef } = doc.data();
    const userSnapshot = userRef.get().then(doc => {
      if (doc.exists) {
        return doc.data().displayName;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    return {
      celkem,
      id: doc.id,
      items,
      userSnapshot
    };
  });
  return transformedCollection;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export default firebase;
