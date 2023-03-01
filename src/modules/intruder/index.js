import Header from 'components/Header';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';

export default function IntruderScreen() {
  const [position] = useInitalLocation();
  return (
    <div className='App'>

      <Header appName='Intruz' />
      <hr></hr>

      <main>
        <div className='map-wrapper'>
          <MapRenderer position={position} db={'map-points'}></MapRenderer>
        </div>
        <div className='right-list'>
            <h2><u>Znalezione punkty</u></h2>
            <UnorderedPoints db={'map-points'}></UnorderedPoints>
        </div>
      </main>

    </div>
  );
}
