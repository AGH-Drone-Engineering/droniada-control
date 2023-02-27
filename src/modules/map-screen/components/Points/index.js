import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useMapPoints from 'modules/data/use-map-points';

// Define custom marker icon
const icon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/crosshair.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0]
});

export default function Points() {
  const points = useMapPoints();
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
  );
}
