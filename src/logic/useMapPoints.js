import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'logic/fb';
import firebase from 'firebase/compat/app';

export default function useMapPoints(dbName) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, dbName), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        if (!('location' in docData)) {
          docData.location = new firebase.firestore.GeoPoint(0, 0);
        }
        return { id: doc.id, ...docData };
      });
      setPoints(data);
    });
  }, [dbName]);

  return points;
}
