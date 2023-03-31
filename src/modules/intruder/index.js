import Header from 'components/Header';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import React, { useState } from 'react';
import { FilterContext } from 'logic/FilterContext';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import useAppConfig from 'logic/FirebaseAppConfig';

const screenDatabase = 'intruder-points';

export default function IntruderScreen() {
  const [position] = useInitalLocation(screenDatabase);
  const [tabIndex, setTabIndex] = useState(0);
  const [config] = useAppConfig();

  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  const [filter, setFilter] = useState({});

  return (
    <div className='App'>
      <div id='header'>
        <Header appName='Intruz' />
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
        <TabList>
          <Tab><p>Mapa z zaznaczonymi punktami</p></Tab>
          <Tab><p>Stream WWW z kamery drona</p></Tab>
        </TabList>

        <TabPanel>
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
        </TabPanel>
        <TabPanel>
          <div className='like-satellite'>
            <img src={config.stream_source} />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
}
