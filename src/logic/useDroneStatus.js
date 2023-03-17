import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from 'logic/fb';

export default function useDroneStatus() {
  const [info, setInfo] = useState({ position: { _lat: '0', _long: 0 } });

  useEffect(() => {
    return onSnapshot(collection(db, 'drone-status'), (querySnapshot) => {
      setInfo(querySnapshot.docs[0].data());
    });
  }, []);

  return [info];
}
