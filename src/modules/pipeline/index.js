
import Header from 'components/Header';
import ModelRenderer from './components/ModelRenderer';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LikeSatelliteMap from './components/LikeSatelliteMap';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import { FilterContext } from 'logic/FilterContext';
import Stats from 'components/Stats';

const screenDatabase = 'pipeline-points';

export default function PipelineScreen() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const [position] = useInitalLocation(screenDatabase);
  const [filter, setFilter] = useState({});

  return (
    <div className='App'>

      <Header appName='Rurociąg' />
      <Stats db={screenDatabase}/>
      <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
        <TabList>
          <Tab><p>Model 3D skanu terenu</p></Tab>
          <Tab><p>Obraz mapy z lotu ptaka</p></Tab>
          <Tab><p>Mapa z zaznaczonymi punktami</p></Tab>
        </TabList>

        <TabPanel>
          <nav className='renderer-menu'></nav>
          <ModelRenderer />
        </TabPanel>
        <TabPanel>
          <LikeSatelliteMap />
        </TabPanel>
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
      </Tabs>

    </div>
  );
}
