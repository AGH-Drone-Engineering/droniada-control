import { useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { positionFallback } from 'logic/useInitalLocation';

export default function MapCenter({ position, dbname = '' }) {
  const [center, setCenter] = useState(position);
  const [settedFlag, setSettedFlag] = useState(false);
  const map = useMap();

  useEffect(() => {
    if (!settedFlag || dbname !== '') {
      map.panTo(center);
    }
  });

  useEffect(() => {
    setCenter(position);
    if (center !== positionFallback) {
      setSettedFlag(true);
    }
  }, [position, settedFlag]);

  return null;
}
