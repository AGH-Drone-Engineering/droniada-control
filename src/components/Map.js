import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Points from 'components/Points';
import Shapes from 'components/Shapes';
import DroneFlightPath from 'components/DroneFlight';
import MapCenter from 'components/MapCenter';

export default function MapRenderer({ position, db, children }) {
  return (
    <MapContainer center={position} zoom={17} style={{ height: '100%' }}>
      <TileLayer
        url='https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoiYWdoLWRlIiwiYSI6ImNsZWxvajl3dDBtd3Qzd29kcnY4YjFxbmMifQ.xUC7tSyVs0LcHrdAf3XNgA'
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Points db={db}></Points>
      <Shapes dbName={db}></Shapes>
      <DroneFlightPath/>
      {children}
      <MapCenter position={position}/>
    </MapContainer>
  );
}
