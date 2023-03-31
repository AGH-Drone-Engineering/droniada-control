import React, { useEffect, useState } from 'react';
import useDroneStatus from 'logic/useDroneStatus';
import useDronePath from 'logic/DronePath';
import useAppConfig from 'logic/FirebaseAppConfig';
import L from 'leaflet';

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

function useIsDroneInAir(data) {
  const config = useAppConfig()[0];
  const [isInAir, setIsInAir] = useState(false);

  useEffect(() => {
    if (data.length <= 0) {
      setIsInAir(false);
      return;
    }
    const lastPoint = data[data.length - 1];
    const serverTime = new Date(lastPoint.timestamp.seconds * 1000); // convert to JS Date object
    const localTime = new Date(); // get current local time
    const diffInS = (localTime.getTime() - serverTime.getTime()) / 1000;
    const alt = 'altitude' in lastPoint ? lastPoint.altitude : 1000 * 1000;
    setIsInAir(diffInS < config.drone_timeout && alt > config.minimum_altitude);
  }, [data, config]);

  return isInAir;
}

function geoPointToLatLng(geoPoint) {
  return L.latLng(geoPoint.latitude, geoPoint.longitude);
}

function getSpeed(data) {
  let speed = -1;
  if (data.length > 1) {
    const lastPoint = data[data.length - 1];
    const preLastPoint = data[data.length - 2];

    const lastTime = new Date(lastPoint.timestamp.seconds * 1000);
    const preLastTime = new Date(preLastPoint.timestamp.seconds * 1000);
    const time = (lastTime.getTime() - preLastTime.getTime()) / 1000;

    const distance = geoPointToLatLng(lastPoint.location).distanceTo(geoPointToLatLng(preLastPoint.location));
    speed = distance / time;
    speed = roundToTwo(speed);
    return { speed };
  } else {
    return { speed, state: 'grounded' };
  }
}

function getPositionAlt(data) {
  const lastPoint = data[data.length - 1];
  return { altitude: lastPoint.altitude, position: lastPoint.location };
}

export default function DroneShortInfo() {
  const [fbDroneStatus] = useDroneStatus();
  const [droneStatus, setDroneStatus] = useState({ status: 'grounded' });
  // const [timeout, setTimeout] = useState(0);
  const [, droneData] = useDronePath();
  const isInAir = useIsDroneInAir(droneData);

  useEffect(() => {
    if (droneData.length > 0) {
      const status = isInAir ? 'flying' : 'grounded';
      // setTimeout(0);
      setDroneStatus({ ...droneStatus, ...getPositionAlt(droneData), status, ...getSpeed(droneData) });
    }
  }, [droneData]);

  /** useEffect(() => {
    setInterval(() => {
      if (timeout > 10) {
        setDroneStatus({ ...droneStatus, status: 'grounded' });
        setTimeout(0);
      }
      console.log(timeout);
      setTimeout(timeout + 1);
    }, 1000);
  }, []);**/

  return (
    <>
      {droneStatus.status === 'grounded'
        ? (
          <>
            <img src={process.env.PUBLIC_URL + '/drone-landed.png'} alt='drone-icon' />
            <h3>Dron na ziemi</h3>
          </>)
        : (
          <>
            {}
            <img src={process.env.PUBLIC_URL + '/drone-clouds.png'} alt='drone-icon' />
            <div><p>{droneStatus.speed} m/s {droneStatus.position._lat}°N <br /> </p><p> {droneStatus.altitude} m {droneStatus.position._long}°E <br /></p><p>{fbDroneStatus.status}</p></div>
          </>)}
    </>
  );
}
