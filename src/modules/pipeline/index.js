
import Header from 'components/Header';
import ModelRenderer from './components/ModelRenderer';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LikeSatelliteMap from './components/LikeSatelliteMap';
import UnorderedPoints from 'components/UnorderedPoints';
import MapRenderer from 'components/Map';
import useInitalLocation from 'logic/useInitalLocation';
import { FilterContext } from 'logic/FilterContext';
import Stats from 'components/Stats';
import setupCSS from 'components/css-with-js';
import useFixTeam from 'logic/useFixTeam';

const screenDatabase = 'pipeline-points';

export default function PipelineScreen() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    setupCSS();
  }, [tabIndex]);

  const [position] = useInitalLocation(screenDatabase);
  const [filter, setFilter] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleOkClick = () => {
    setIsOpen(false);
  };

  const [fixState] = useFixTeam();

  useEffect(() => {
    setIsOpen(fixState === 'yes' || fixState === 'no');
  }, [fixState]);

  const [scale, setScale] = useState(50); // initial scale value

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  return (
    <div className='App'>
      <div id='header'>
        <Header appName='Rurociąg' />
        <Stats db={screenDatabase} />
      </div>
      <div>
        {isOpen && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleOkClick}>
                &times;
              </span>
              <p>Po wnikliwej analizie infrastruktury krytycznej, nasz zespół doszedł do wniosku, że
                {fixState === 'yes' ? <> należy <b>poprosić ekipę remontową</b> o usunięcie części usterek.</> : <> nie potrzeba ekipy remontowej, <b>infrastruktura jest sprawna.</b></>}</p>
              <button className='xx' onClick={handleOkClick}>OK</button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabChange}>
          <div className='tab-packer'>
            <div className='tabs-container'>
              <TabList>
                <Tab><p>Model 3D skanu terenu</p></Tab>
                <Tab><p>Obraz mapy z lotu ptaka</p></Tab>
                <Tab><p>Mapa z zaznaczonymi punktami</p></Tab>
              </TabList>
            </div>
            {tabIndex === 0 && <div className='slider-container'>
              <label htmlFor='scale-slider'>Skala modelu:</label>

              <input type='range' id='scale-slider' name='scale' min='0' max='100' value={scale} onChange={handleScaleChange} />
              <span>{scale}%</span>
            </div>}

          </div>
          <TabPanel>
            <nav className='renderer-menu'></nav>
            <ModelRenderer scale={scale}/>
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

    </div>
  );
}
