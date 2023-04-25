import { useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { positionFallback } from 'logic/useInitalLocation';

function cmpObjs(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function MapCenter({ position, alwaysUpdate = false }) {
  const map = useMap();
  const [onceFlag, setOnceFlag] = useState(true);

  useEffect(() => {
    if (!cmpObjs(position, positionFallback)) {
      setOnceFlag(false);
    }
    if (onceFlag || alwaysUpdate) {
      map.panTo(position);
    }
  });

  return null;
}
