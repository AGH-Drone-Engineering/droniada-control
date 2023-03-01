import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useMapPoints from 'logic/useMapPoints';

// Define custom marker icon
const crosshairIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const qrCodeIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/qrcode.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const faultIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/siren.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

const icons = [crosshairIcon, faultIcon, qrCodeIcon];

function getIcon(point) {
  if ('iconid' in point) {
    return icons[point.iconid];
  } else {
    return icons[0];
  }
}

export default function Points(props) {
  const points = useMapPoints(props.db);
  return (
    <>
         {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.location.latitude, point.location.longitude]}
          icon={getIcon(point)}
        >
          <Popup>
            <div className='marker-popup'>
              <img src={'data:image/jpeg;base64,/9j/' + point.img} className="icon-img" alt='Capture from drone'></img>
              <p>{point.name}</p>
            </div>
          </Popup>
        </Marker>
         ))}
    </>
  );
}
