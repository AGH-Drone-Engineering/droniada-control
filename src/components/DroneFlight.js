import React from 'react';
import { Polyline } from 'react-leaflet';

export default function DroneFlightPath() {
  return (
    <Polyline stroke={1} positions={[[1, 0], [0, 1], [1, 1]]}/>
  );
}
