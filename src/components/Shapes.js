import { useEffect, useRef, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from 'logic/fb';
import { Polygon, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { getIcon } from 'logic/TypeLogic';

function getPositions(x) {
  return [[x.position1._lat, x.position1._long], [x.position2._lat, x.position2._long], [x.position3._lat, x.position3._long], [x.position4._lat, x.position4._long]];
}

function getAB(polygon, n) {
  const a = polygon.current.getLatLngs()[0][(n - 1) % 4];
  const b = polygon.current.getLatLngs()[0][n % 4];
  return [a, b];
}

function getCenter(polygon, n) {
  const [a, b] = getAB(polygon, n);
  return L.latLng((a.lat + b.lat) / 2, (a.lng + b.lng) / 2);
}

function getDistance(polygon, n) {
  const [a, b] = getAB(polygon, n);
  return a.distanceTo(b).toFixed(2);
}

const directions = ['', 'bottom', 'left', 'top', 'right'];

export default function Shapes({ dbName }) {
  const [shapes, setShapes] = useState([]);
  const [polygon, setPolygon] = useState({ current: undefined });
  const polygonRef = useRef();

  useEffect(() => {
    return onSnapshot(collection(db, 'shapes'), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setShapes(data);
    });
  }, []);

  // @Carbon
  // Ten kod nie ma prawa bytu, ale działa
  // Nie znam innego sposobu jak obsłużyć polygonRef tak, aby wyświetlane były "tooltipy" z szerokościami boków strefy.
  // Jeśli poprostu nie było tego poniżej to wyświetlało tooltipy na każdym panelu oprócz Rurociągu na kompie, bo Rurociąg na telefonie już był wyświetlony poprawnie
  // Podejrzewam że obsługa ref'ów powinna odbywać się kompletnie inaczej więc tutaj komentuje.
  // ======================================

  // To żeby działało przy Intruzie, Drzewie życia:
  /* useEffect(() => {
    if ('current' in polygonRef && polygonRef.current !== undefined) {
      setPolygon(polygonRef);
    }
  }, [polygonRef, polygonRef.current]);

  // To żeby działało przy Rurociągu:
  useEffect(() => {
    if ('current' in polygonRef && polygonRef.current !== undefined) {
      setPolygon(polygonRef);
    }
  }); */

  // Nowe dziwne rozwiązanie, ale działa:
  useEffect(() => {
    if ('current' in polygonRef && polygonRef.current !== undefined) {
      setPolygon(polygonRef);
    }
  }, [shapes, polygonRef.current]);
  // ======================================

  return (
    <>
      {shapes.map((x, i) => {
        if (!('database' in x) || (x.database === dbName || x.database === '')) {
          return (
            <Polygon positions={getPositions(x)} ref={polygonRef} key={x.id} color={'color' in x ? x.color : '#3333FF'}>
              {polygon.current !== undefined && [1, 2, 3, 4].map((ii) => (<Marker key={ii} icon={getIcon({ type: 'generic' })} position={getCenter(polygon, ii)} opacity='0'>
                <Tooltip permanent direction={directions[ii]} content={getDistance(polygon, ii) + 'm'} offset={[0, 0]}></Tooltip>
              </Marker>))
              }
               {polygon.current !== undefined && <Tooltip className='middle-tooltip' content={x.name}/>
               }
            </Polygon>
          );
        }
        return <></>;
      })}

    </>

  );
}
