import DroneShortInfo from 'components/DroneShortInfo';
import { useEffect } from 'react';
import setupCSS from 'components/css-with-js';
import useLotsOfPoints from 'debug/lots-of-points';
import usePathTest from 'debug/path-test';

export default function Header({ appName }) {
  useEffect(() => {
    setupCSS();
    useLotsOfPoints();
    usePathTest();
  }, []);
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
        <DroneShortInfo/>
      </div>
    </header>
  );
}
