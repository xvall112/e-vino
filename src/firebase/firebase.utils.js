import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
  const actualDate = new Date();
  const createAt = firebase.firestore.Timestamp.fromDate(new Date());
  const userRef = firestore.collection("users").doc(currentUser.id);
  const { id, displayName, email } = currentUser;
  const ordersRef = firestore.collection("orders");

  await ordersRef
    .add({
      items: cartItems,
      user: { id, displayName, email },
      celkem: total,
      date: createAt
    })
    .then(docRef => {
      const orderId = docRef.id;
      userRef.update({
        orders: firebase.firestore.FieldValue.arrayUnion({
          orderId
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
    const { name, price, obsah, color, rocnik, druh, image } = doc.data();

    return {
      image,
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
    const { celkem, items, user, date } = doc.data();

    return {
      celkem,
      id: doc.id,
      items,
      user,
      date
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
export const storageRef = firebase.storage().ref();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export default firebase;
