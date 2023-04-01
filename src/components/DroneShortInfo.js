import React, { useEffect, useState } from 'react';
import useDroneStatus from 'logic/useDroneStatus';
import useDronePath from 'logic/DronePath';
import useAppConfig from 'logic/FirebaseAppConfig';
import L from 'leaflet';
import useLocalTime from 'logic/LocalTime';

function roundToTwo(num) {
  return Math.round(num * 100) / 100;
}

function useIsDroneInAir() {
  const [config] = useAppConfig();
  const [, data] = useDronePath();
  const [localTime] = useLocalTime();
  const [isInAir, setIsInAir] = useState(false);

  function checkInAir() {
    if (data.length <= 0) {
      setIsInAir(false);
      return;
    }
    const lastPoint = data[data.length - 1];
    const serverTime = new Date(lastPoint.timestamp.seconds * 1000); // convert to JS Date object
    const diffInS = (localTime.getTime() - serverTime.getTime()) / 1000;
    const alt = 'altitude' in lastPoint ? lastPoint.altitude : (1000 * 1000);
    setIsInAir(diffInS < config.drone_timeout && alt > config.minimum_altitude);
  }

  useEffect(() => {
    checkInAir();
  }, [data, config, localTime]);

  return [isInAir];
}

function geoPointToLatLng(geoPoint) {
  return L.latLng(geoPoint.latitude, geoPoint.longitude);
}

function getSpeed(data) {
  let speed = 0;
  if (data.length > 1) {
    const lastPoint = data[data.length - 1];
    const preLastPoint = data[data.length - 2];

    const lastTime = new Date(lastPoint.timestamp.seconds * 1000);
    const preLastTime = new Date(preLastPoint.timestamp.seconds * 1000);
    const time = (lastTime.getTime() - preLastTime.getTime()) / 1000;

    const distance = geoPointToLatLng(lastPoint.location).distanceTo(geoPointToLatLng(preLastPoint.location));
    speed = distance / time;
    speed = roundToTwo(speed);
  }
  return { speed };
}

function getPositionAlt(data) {
  const lastPoint = data[data.length - 1];
  return { altitude: lastPoint.altitude, position: lastPoint.location };
}

export default function DroneShortInfo() {
  const [fbDroneStatus] = useDroneStatus();
  const [droneStatus, setDroneStatus] = useState({ status: 'grounded' });
  const [, droneData] = useDronePath();
  const [isInAir] = useIsDroneInAir(droneData);

  useEffect(() => {
    if (droneData.length > 0) {
      const status = isInAir ? 'flying' : 'grounded';
      setDroneStatus({ ...droneStatus, ...getPositionAlt(droneData), status, ...getSpeed(droneData) });
    }
  }, [droneData, isInAir]);

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
