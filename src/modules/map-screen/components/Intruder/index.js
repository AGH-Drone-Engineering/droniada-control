
import '../index.css';
import Header from '../Header';

import UnorderedPoints from '../UnorderedPoints';
import useInitalLocation from '../InitViewPosition/useInitalLocation';
import MapRenderer from '../Map/map';

export function IntruderScreen() {
  const [position] = useInitalLocation();
  return (
    <div className='App'>

      <Header></Header>
      <hr></hr>

      <main>
        <div className='map-wrapper'>
          <MapRenderer position={position}></MapRenderer>
        </div>
        <div className='right-list'>
            <h2><u>Znalezione punkty</u></h2>
            <UnorderedPoints></UnorderedPoints>
        </div>
      </main>

    </div>
  );
}
