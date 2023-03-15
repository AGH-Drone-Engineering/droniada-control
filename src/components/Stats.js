import React, { useEffect, useState } from 'react';
import useMapPoints from 'logic/useMapPoints';
import { getType, mapType, getIcon } from 'logic/TypeLogic';

export default function Stats({ db }) {
  const points = useMapPoints(db);
  const [pointCount, setPointCount] = useState({});
  const [imgs, setImgs] = useState({});

  useEffect(() => {
    const counterDict = {};
    const imgList = {};
    points.forEach((x) => {
      counterDict[getType(x)] = 0;
      imgList[getType(x)] = '';
    });
    points.forEach((x) => {
      counterDict[getType(x)]++;
      imgList[getType(x)] = getIcon(x).options.iconUrl;
    });
    setPointCount(counterDict);
    setImgs(imgList);
  }, [points]);

  return (
    <div className='statter'>
      {Object.keys(pointCount).map((x) =>
         <div className='stat-element' key={x}>
            <img src={imgs[x]} className='mini-icon'/> <p>{ mapType(x)}: {pointCount[x]}</p>
         </div>
      )}
      <h2>Suma: {Object.values(pointCount).reduce((a, x) => {
        return a + x;
      }, 0)}</h2>
    </div>
  );
}
