import useMapPoints from 'logic/useMapPoints';
import { FilterContext } from 'logic/FilterContext';
import { useContext, useEffect, useState } from 'react';
import { getType, nameMap } from 'logic/TypeLogic';

export default function UnorderedPoints({ db }) {
  const { filter, setFilter } = useContext(FilterContext);
  const [checkboxes, setCheckboxes] = useState();
  const points = useMapPoints(db);

  useEffect(() => {
    setFilter(
      points.reduce((acc, x) => {
        acc[getType(x)] = true;
        return acc;
      }, {})
    );
  }, [points]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [value]: checked
    }));
  };

  const handleShowAllClick = () => {
    setFilter(
      Object.keys(filter).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
  };

  const handleHideAllClick = () => {
    setFilter(
      Object.keys(filter).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    setCheckboxes(Object.keys(filter).map(key => (
            <div key={key} className='checkbox-wrapper'>
                <input type="checkbox" value={key} checked={filter[key]} onChange={handleCheckboxChange} />
                <label>{key in nameMap ? nameMap[key] : key}</label>
            </div>
    )));
  }, [filter]);

  return (
        <>
            <h2>Filtrowanie: </h2>
            <div className="alles-oder-nichts">
                <button onClick={handleShowAllClick}>Pokaż wszystkie</button>
                <button onClick={handleHideAllClick}>Ukryj wszystkie</button>
            </div>
            <div className='checkboxes'>
                {checkboxes}
            </div>
            <hr></hr>
            <h2>Znalezione punkty: </h2>
            <div className='flex'>
                {points.map((point) => {
                  if (!filter[getType(point)]) { return <></>; }
                  return (
                    <div className='flex-item' key={point.name}>
                        <br />
                        <br />
                        <img src={'data:image/jpeg;base64,/9j/' + point.img} alt='Capture from drone'></img>
                        <h3>{point.name}</h3>
                    </div>);
                })}
            </div>
        </>
  );
}
