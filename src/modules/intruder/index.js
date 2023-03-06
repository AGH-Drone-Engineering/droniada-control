import Header from 'components/Header';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import React, { useState } from 'react';
import { FilterContext } from 'logic/FilterContext';
import useLotsOfPoints from 'debug/lots-of-points';

const screenDatabase = 'map-points';

export default function IntruderScreen() {
  const [position] = useInitalLocation(screenDatabase);
  const [filter, setFilter] = useState({});
  useLotsOfPoints();

  return (
    <div className='App'>
      <Header appName='Intruz' />
      <hr></hr>

      <FilterContext.Provider value={{ filter, setFilter }}>
        <main>
          <div className='map-wrapper'>
            <MapRenderer position={position} db={screenDatabase} />
          </div>
          <div className='right-list'>
            <UnorderedPoints db={screenDatabase} />
          </div>
        </main>
      </FilterContext.Provider>
    </div>
  );
}
