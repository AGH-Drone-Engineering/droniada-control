import { Marker, Popup } from 'react-leaflet';
import useMapPoints from 'logic/useMapPoints';
import { useContext } from 'react';
import { FilterContext } from 'logic/FilterContext';
import { getType, getIcon } from 'logic/TypeLogic';
import { removePointFromMap } from 'logic/FbPointLogic';
import { useUserIsAdmin } from 'logic/auth';

export default function Points({ db }) {
  const points = useMapPoints(db);
  const { filter } = useContext(FilterContext);
  const [admin] = useUserIsAdmin();

  const handleRemoveMarker = (point) => {
    removePointFromMap(db, point.id);
  };

  return (
    <>
      {points.map((point) => {
        if (filter !== undefined && !filter[getType(point)]) { return (<></>); }
        const shooted = 'shooted' in point && point.shooted;
        const rawDate = 'timestamp' in point ? point.timestamp.toDate() : undefined;
        let date = '';
        let time = '';
        if (rawDate !== undefined) {
          date = '📆' + rawDate.toLocaleDateString('pl-PL');
          time = '⌚' + rawDate.toLocaleTimeString('pl-PL');
        }
        return (
          <>
            <Marker
              key={point.id}
              position={[point.location.latitude, point.location.longitude]}
              icon={getIcon(point)}
              zIndexOffset={-10}
            >
              <Popup key={point.id}>
                <div className='marker-popup'>
                  <img src={'data:image/jpeg;base64,/9j/' + point.img} className="icon-img" alt='Capture from drone'></img>
                  <p>{point.name}</p>
                  <p> {date} <br/> {time} </p>
                  {admin &&
                  <a onClick={() => handleRemoveMarker(point)}>Usuń punkt</a> }
                </div>
              </Popup>
            </Marker>
            {shooted
              ? <Marker
                key={point.id + '_shooted_icon'}
                position={[point.location.latitude, point.location.longitude]}
                icon={getIcon({ type: 'generic' })}
                zIndexOffset={0}
                interactive={false}
              >
              </Marker>
              : <></>}

          </>
        );
      })}
    </>
  );
}
