import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from 'logic/fb';

export default function useAppConfig() {
  const [config, setConfig] = useState({ stream_source: '', demo_video: '', drone_timeout: 30, minimum_altitude: 0.3 });

  useEffect(() => {
    return onSnapshot(collection(db, 'configuration'), (querySnapshot) => {
      setConfig(querySnapshot.docs[0].data());
    });
  }, []);

  return [config];
}
