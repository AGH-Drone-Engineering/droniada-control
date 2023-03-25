import { useEffect, useRef, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from 'logic/fb';
import { Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function getPositions(x) {
  return [[x.position1._lat, x.position1._long], [x.position2._lat, x.position2._long], [x.position3._lat, x.position3._long], [x.position4._lat, x.position4._long]];
}

export default function Shapes({ dbName }) {
  const [shapes, setShapes] = useState([]);
  const [bounds, setBounds] = useState([]);
  const polygonRef = useRef();

  useEffect(() => {
    return onSnapshot(collection(db, 'shapes'), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setShapes(data);
      setBounds(shapes.map((x) => {
        return L.polygon(getPositions(x)).getBounds();
      }));
      console.log(bounds);
    });
  }, []);

  return (
    <>
    {shapes.map((x, i) => {
      return (
        <Polygon positions={getPositions(x)} ref={polygonRef} key={x.id}>
          { polygonRef.current !== undefined
            ? <Marker position={[polygonRef.current.getBounds().getNorth(), polygonRef.current.getBounds().getCenter().lng]}>
          <Popup>Width: {Math.abs(polygonRef.current.getBounds().getEast() - polygonRef.current.getBounds().getWest()).toFixed(2)}</Popup>
        </Marker>
            : <></>}
        </Polygon>);
    })}
    </>

  );
}
