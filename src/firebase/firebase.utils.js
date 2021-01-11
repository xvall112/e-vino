import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyABOr3Vj_-gy7GPoAdRWes2R351oWNwb20",
  authDomain: process.env.FIREBASE_API_KEY,
  databaseURL: "https://evino-30926.firebaseio.com",
  projectId: "evino-30926",
  storageBucket: "evino-30926.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const addOrderToFirestore = async (items) => {
  const {
    payload: { cartItems, currentUser, total },
  } = items;
  const createAt = firebase.firestore.Timestamp.fromDate(new Date());
  const { id, displayName, email } = currentUser;
  let orderId;

  const batch = firestore.batch();
  const ordersRef = firestore.collection("orders");
  const userRef = firestore.collection("users").doc(id);

  await ordersRef
    .add({
      items: cartItems,
      user: { id, displayName, email },
      celkem: total,
      date: createAt,
    })
    .then((docRef) => {
      orderId = docRef.id;
      console.log("add order success");
    })
    .catch(function (error) {
      console.log(error);
    });

  await userRef
    .update({
      orders: firebase.firestore.FieldValue.arrayUnion({
        id: orderId,
        items: cartItems,
        celkem: total,
        date: createAt,
      }),
    })
    .then(() => {
      console.log("add order user success");
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL, uid } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        id: uid,
        displayName,
        email,
        createAt,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addWines = ({
  image,
  values: { color, druh, name, obsah, price, rocnik },
}) => {
  const winesRef = firestore.collection("wines");
  try {
    winesRef.add({
      name,
      price,
      obsah,
      color,
      rocnik,
      druh,
      image,
    });
  } catch (error) {
    console.log("error add wines", error.message);
  }
};

export const updateWines = ({
  id,
  image,
  values: { color, druh, name, obsah, price, rocnik },
}) => {
  const winesRef = firestore.collection("wines").doc(id);
  try {
    winesRef.update({
      name,
      price,
      obsah,
      color,
      rocnik,
      druh,
      image,
    });
  } catch (error) {
    console.log("error add wines", error.message);
  }
};

export const convertWinesSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { name, price, obsah, color, rocnik, druh, image } = doc.data();

    return {
      image,
      name,
      price,
      obsah,
      color,
      rocnik,
      druh,
      image,
      id: doc.id,
    };
  });
  return transformedCollection;
};

export const convertCollectionAllOrdersToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { celkem, items, user, date } = doc.data();

    return {
      celkem,
      id: doc.id,
      items,
      user,
      date,
    };
  });
  return transformedCollection;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default firebase;
