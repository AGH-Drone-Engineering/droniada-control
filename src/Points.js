import {useEffect, useState} from 'react';
import { Marker, Popup } from "react-leaflet";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define custom marker icon
const icon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
});

  
export default function Points() {

 const [points, setPoints] = useState([]);
  useEffect(() => {
    // Initialize Firebase app
    const db = getFirestore();

    // Listen for changes to 'points' collection and update state
    const unsubscribe = onSnapshot(collection(db, "map-points"), (querySnapshot) => {
        
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPoints(data);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
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
