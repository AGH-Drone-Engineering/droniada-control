import { Marker, Popup } from 'react-leaflet';
import useMapPoints from 'logic/useMapPoints';
import { useContext } from 'react';
import { FilterContext } from 'logic/FilterContext';
import { getType, getIcon, nameMap } from 'logic/TypeLogic';

export default function Points({ db }) {
  const points = useMapPoints(db);
  const { filter } = useContext(FilterContext);
  return (
    <>
         {points.map((point) => {
           if (!filter[getType(point)]) { return (<></>); }
           return (
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
        </Marker>);
         })}
    </>
  );
}
