import { db } from 'logic/fb';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

function addPointToMap(dbName, point, p, time) {
  addDoc(collection(db, dbName), { ...point, location: new firebase.firestore.GeoPoint(p.lat, p.lng), timestamp: firebase.firestore.Timestamp.fromDate(new Date(time)) });
}

function removePointFromMap(dbName, id) {
  deleteDoc(doc(db, dbName, id));
}

export { addPointToMap, removePointFromMap };
