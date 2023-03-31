import { db } from 'logic/fb';
import firebase from 'firebase/compat/app';
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/compat/firestore';

export default function usePathTest() {
  // To use in google dev tools
  window.pathTest = initPoints;
}

const docId = 'drone-path';

function initPoints() {
  addPointsX();
}

function addPointsX() {
  // Generate random values for each field
  const altitude = 2;
  const centerLatitude = 50.2380583;
  const centerLongitude = 19.0331179;
  const radius = 0.002; // 0.05 degrees is about 5.6km at the equator
  const latitude = (Math.random() * (radius * 2) + (centerLatitude - radius)).toFixed(4);
  const longitude = (Math.random() * (radius * 2) + (centerLongitude - radius)).toFixed(4);

  // Create a new document in the specified collection with the random values
  addDoc(collection(db, docId), {
    location: new firebase.firestore.GeoPoint(latitude, longitude),
    altitude,
    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
}
