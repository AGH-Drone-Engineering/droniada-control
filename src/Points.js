import {useEffect, useState} from 'react';
import { Marker, Popup } from "react-leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './Firebase';
import L from 'leaflet';

// Define custom marker icon
const icon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0],
});


export default function Points() {

  const [points, setPoints] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "map-points"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPoints(data);
    });
  }, []);

  return (
    <>
         {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.location.latitude, point.location.longitude]}
          icon={icon}
        >
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </>
  )
}
