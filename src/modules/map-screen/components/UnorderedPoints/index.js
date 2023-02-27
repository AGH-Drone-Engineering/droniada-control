import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'modules/data/fb';

export default function UnorderedPoints() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'map-points'), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPoints(data);
    });
  }, []);

  return (
        <>
            <div className='flex'>
            {points.map((point) => (
                <div className='flex-item' key={point}>
                <br />
                <br />
                    <img src={'data:image/jpeg;base64,/9j/' + point.img} alt='Capture from drone'></img>
                    <h3>{point.name}</h3>
                </div>
            ))}
            </div>
        </>
  );
}
