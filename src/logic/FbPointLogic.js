import { db } from 'logic/fb';
import { collection, addDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

export default function addPointToMap(dbName, point, p, time) {
  addDoc(collection(db, dbName), { ...point, location: new firebase.firestore.GeoPoint(p.lat, p.lng), timestamp: firebase.firestore.Timestamp.fromDate(new Date(time)) });
}
