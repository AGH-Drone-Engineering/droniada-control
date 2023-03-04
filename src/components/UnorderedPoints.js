import useMapPoints from 'logic/useMapPoints';
import { FilterContext } from './FilterContext';
import { useContext, useEffect, useState } from 'react';

export default function UnorderedPoints({ db }) {
  const { filter, setFilter } = useContext(FilterContext);
  const [checkboxes, setCheckboxes] = useState();
  const points = useMapPoints(db);

  useEffect(() => {
    setFilter(
      points.reduce((acc, x) => {
        acc[x.type] = true;
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

  useEffect(() => {
    setCheckboxes(Object.keys(filter).map(key => (
        <div key={key} className='checkbox-wrapper'>
          <input type="checkbox" value={key} checked={filter[key]} onChange={handleCheckboxChange}/>
          <label>{key}</label>
        </div>
    )));
  }, [filter]);

  return (
        <>
            <h2>Filtrowanie: </h2>
            <div className='checkboxes'>
                {checkboxes}
            </div>
            <hr></hr>
            <h2>Znalezione punkty: </h2>
            <div className='flex'>
            {points.map((point) => (
                <div className='flex-item' key={point}>
                <br />
                <br />
                    <img src={'data:image/jpeg;base64,/9j/' + point.img} alt='Capture from drone'></img>
                    <h3>{point.name}</h3>
                </div>
            ))}
            </div>
        </>
  );
}
