import { useEffect, useState } from 'react';
import setupCSS from 'components/css-with-js';
import useDroneStatus from 'logic/useDroneStatus';

export default function Header({ appName }) {
  const [droneInfo] = useDroneStatus();
  const [droneStatus, setDroneStatus] = useState('');

  useEffect(() => {
    setupCSS();
  }, []);
  useEffect(() => {
    if (!('altitude' in droneInfo) || droneInfo.altitude < 0.3 ||
      ('status' in droneInfo && droneInfo.status === 'grounded')
    ) {
      setDroneStatus('grounded');
    } else {
      setDroneStatus('other');
    }
    // TODO logic for possible other states
  }, [droneInfo]);

  return (
    <header>
      <h1>{appName}</h1>
      <div className="head1">
        <h1>
          Droniada 2023
        </h1>
        <img src={process.env.PUBLIC_URL + '/agh-de-logo.png'} alt='agh-de-logo' />
      </div>
      <div className="empty">
        {droneStatus === 'grounded'
          ? (
          <>
            <img src={process.env.PUBLIC_URL + '/drone-landed.png'} alt='drone-icon' />
             <h3>Dron na ziemi</h3>
          </>)
          : (
          <>

          <img src={process.env.PUBLIC_URL + '/drone-clouds.png'} alt='drone-icon' />
            <div><p>{droneInfo.speed} m/s {droneInfo.position._lat}°N <br/> </p><p> {droneInfo.altitude} m {droneInfo.position._long}°E <br/></p><p>{droneInfo.status}</p></div>
            </>)}
      </div>
    </header>
  );
}
