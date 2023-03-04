import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'logic/fb';

// Katowice Muchowiec Fallback position
const positionFallback = { lat: 50.238284041030674, lng: 19.032943917374634 };

function calculateCentroid(points) {
  // points = Object.values(points);
  const lats = points.map(x => x.data().location._lat);
  const longs = points.map(x => x.data().location._long);
  const gx = lats.reduce((a, b) => a + b) / lats.length;
  const gy = longs.reduce((a, b) => a + b) / longs.length;
  return { lat: gx, lng: gy };
}

export default function useInitalLocation(dbname) {
  const [center, setCenter] = useState(positionFallback);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    try {
      return onSnapshot(collection(db, dbname), (querySnapshot) => {
        setFallback(querySnapshot.docs.length < 0);
      });
    } catch (err) {
      console.error('Database ' + dbname + ' error, switching to fallback map starting point');
      setFallback(true);
    }
  }, []);

  useEffect(() => {
    if (fallback === true) {
      setCenter(positionFallback);
    } else {
      return onSnapshot(collection(db, dbname), (querySnapshot) => {
        const data = querySnapshot.docs;
        const centroid = calculateCentroid(data);
        setCenter(centroid);
      });
    }
  }, [fallback]);

  return [center];
}
