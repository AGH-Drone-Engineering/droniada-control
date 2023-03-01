import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './fb';

export default function useMapPoints(dbName) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, dbName), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPoints(data);
    });
  }, []);

  return points;
}
