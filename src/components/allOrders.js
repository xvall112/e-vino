import React, { useState, useEffect } from "react";
import {
  firestore,
  convertCollectionAllOrdersToMap
} from "../firebase/firebase.utils";

const allOrders = () => {
  useEffect(() => {
    const allOrdersRef = firestore.collection("orders");
    allOrdersRef.onSnapshot(async snapshot => {
      const allOrdersMap = convertCollectionAllOrdersToMap(snapshot);
    });
  }, []);

  return <div></div>;
};

export default allOrders;
