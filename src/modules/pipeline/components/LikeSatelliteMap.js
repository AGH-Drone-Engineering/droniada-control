import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'logic/fb';

export default function LikeSatelliteMap() {
  const [loadErr, setLoadErr] = useState(false);
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    getDownloadURL(ref(storage, '/map.jpg'))
      .then((url) => {
        setImgUrl(url);
        setLoadErr(false);
      })
      .catch(() => {
        setLoadErr(true);
      });
  }, []);

  if (loadErr) {
    return (<h2> <span style={{ color: 'red' }}>Błąd podczas ładowania zdjęcia mapy terenu</span></h2>);
  }

  return (
    <img src={imgUrl}/>
  );
}
