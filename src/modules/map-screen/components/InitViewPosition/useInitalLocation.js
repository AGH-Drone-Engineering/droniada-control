import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'modules/data/fb';

// Katowice Muchowiec Fallback
// const positionFallback = { lat: 50.238284041030674, lng: 19.032943917374634 };
const positionFallback = { lat: 0, lng: 0 };

function calculateCentroid(points) {
  points = Object.values(points);
  const lats = points.map(x => x._lat);
  const longs = points.map(x => x._long);
  const gx = lats.reduce((a, b) => a + b) / lats.length;
  const gy = longs.reduce((a, b) => a + b) / longs.length;
  return { lat: gx, lng: gy };
}

export default function useInitalLocation() {
  const [points, setPoints] = useState(positionFallback);
  const [fallback, setFallback] = useState(undefined);

  if (fallback === undefined) {
    try {
      onSnapshot(collection(db, 'init-data'), (querySnapshot) => {
        setFallback(querySnapshot.docs.length < 0);
      });
    } catch (err) {
      setFallback(true);
    }
  }

  useEffect(() => {
    if (fallback) {
      return onSnapshot(collection(db, 'fallback-init-data'), (querySnapshot) => {
        const data = querySnapshot.docs[0].data().location;
        setPoints({ lat: data._lat, lng: data._long });
      });
    } else {
      return onSnapshot(collection(db, 'init-data'), (querySnapshot) => {
        const data = querySnapshot.docs[0].data();
        // console.log('data:', data);
        const centroid = calculateCentroid(data);
        setPoints(centroid);
      });
    }
  }, positionFallback);
  return [points];
}
