import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'modules/data/fb';

// Katowice Muchowiec Fallback
const positionFallback = { lat: 50.238284041030674, lng: 19.032943917374634 };

function calculateCentroid(p1, p2, p3, p4) {
  const x1 = p1._lat;
  const y1 = p1._long;
  const x2 = p2._lat;
  const y2 = p2._long;
  const x3 = p3._lat;
  const y3 = p3._long;
  const x4 = p4._lat;
  const y4 = p4._long;
  const gx = (x1 + x2 + x3 + x4) / 4;
  const gy = (y1 + y2 + y3 + y4) / 4;
  return { lat: gx, lng: gy };
}

export default function useInitalLocation() {
  const [points, setPoints] = useState(positionFallback);

  useEffect(() => {
    return onSnapshot(collection(db, 'init-data'), (querySnapshot) => {
      const data = querySnapshot.docs[0].data();
      // console.log('data:', data);
      const centroid = calculateCentroid(data.p1, data.p2, data.p3, data.p4);
      // console.log('centroid:', centroid);
      setPoints(centroid);
    });
  }, positionFallback);
  return [points];
}
