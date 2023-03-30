import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'logic/fb';

export default function useDronePath() {
  const [points, setPoints] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'drone-path'), orderBy('timestamp')), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      const points = querySnapshot.docs.map((doc) => {
        const pos = doc.data().location;
        return [pos._lat, pos._long];
      });
      setPoints(points);
      setData(data);
    });
  }, []);

  return [points, data];
}
