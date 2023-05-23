import { dogIcon } from 'logic/TypeLogic';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'logic/fb';
import { Marker } from 'react-leaflet';

export default function RoboDogMarker() {
  const [dogData, setDogData] = useState({ location: [0, 0] });

  useEffect(() => {
    return onSnapshot(collection(db, 'dog-data'), (querySnapshot) => {
      const doc = querySnapshot.docs[0].data();
      const loc = doc.location;
      doc.location = [loc._lat, loc._long];
      setDogData(doc);
    });
  }, []);

  return (
    <>
      <Marker position={dogData.location} icon={dogIcon} interactive={false}/>
    </>
  );
}
