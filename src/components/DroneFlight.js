import useDronePath from 'logic/DronePath';
import { animatedDroneIcon } from 'logic/TypeLogic';
import React, { useState, useEffect } from 'react';
import { Marker, Polyline } from 'react-leaflet';

export default function DroneFlightPath() {
  const [path, data] = useDronePath();
  const [location, setDroneLocation] = useState([0, 0]);

  useEffect(() => {
    if (data.length > 0) {
      let lastData = data[data.length - 1].location;
      lastData = [lastData._lat, lastData._long];
      setDroneLocation(lastData);
    }
  }, [data]);

  return (
    <>
      <Polyline weight={2} positions={path} color='blue' interactive={false} />
      <Marker position={location} icon={animatedDroneIcon} interactive={false}/>
    </>
  );
}
