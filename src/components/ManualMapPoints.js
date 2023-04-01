import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import Shapes from 'components/Shapes';
import Points from 'components/Points';
import useInitalLocation from 'logic/useInitalLocation';
import { icons, mapType } from 'logic/TypeLogic';
import { addPointToMap } from 'logic/FbPointLogic';

function toIsoString(date) {
  const pad = function(num) {
    return (num < 10 ? '0' : '') + num;
  };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds());
}

export default function ManualMapPoints() {
  const [screenDatabase, setScreenDatabase] = useState('intruder-points');
  const [position] = useInitalLocation(screenDatabase);
  const [key, setKey] = useState('');
  const [clickedPos, setClickedPos] = useState({ lat: 0, lng: 0 });
  const [pointType, setPointType] = useState('');
  const [pointName, setPointName] = useState('');
  const [pointTimeStamp, setPointTimeStamp] = useState(toIsoString(new Date()));
  const [timeUpdate, setTimeUpdate] = useState(false);
  const [img64, setImg64] = useState('');

  function MapEvents() {
    useMapEvents({
      click(e) {
        setClickedPos({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });
  }

  const onChangeDb = (e) => {
    setScreenDatabase(e.target.value);
    setKey('key_' + e.target.value);
  };

  const onChangeLatLng = (type, e) => {
    if (isNaN(e.target.value)) { return; }
    const x = { ...clickedPos };
    x[type] = e.target.value;
    setClickedPos(x);
  };

  const onChangeDateTime = (e) => {
    const date = new Date(e.target.value);
    setPointTimeStamp(toIsoString(date));
  };

  const onCheckedAutoTime = () => {
    setTimeUpdate(!timeUpdate);
  };

  const onSubmit = () => {
    const time = timeUpdate ? toIsoString(new Date()) : pointTimeStamp;
    addPointToMap(screenDatabase, { img: img64, name: pointName, type: pointType, shooted: false }, clickedPos, time);
  };

  return (
    <div className='mannual-wrapper'>
      <div className='mannual-mapper'>
        <MapContainer center={position} zoom={17} style={{ height: '100%' }}>
          <TileLayer
            url='https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoiYWdoLWRlIiwiYSI6ImNsZWxvajl3dDBtd3Qzd29kcnY4YjFxbmMifQ.xUC7tSyVs0LcHrdAf3XNgA'
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Points db={screenDatabase} key={key + '_points'}></Points>
          <Shapes dbName={screenDatabase} key={key + '_shapes'}></Shapes>
          <Marker position={clickedPos}></Marker>
          <MapEvents />
        </MapContainer>
      </div>
      <div className='mannual-controls'>
        <h2>Dodawanie ręczne punktu</h2>

        <label htmlFor="pointTypeSelect">Konkurencja:</label>
        <select id="pointTypeSelect" onChange={onChangeDb}>
          <option value="intruder-points">Intruz</option>
          <option value="tree-points">Drzewo życia</option>
          <option value="pipeline-points">Rurociąg</option>
        </select>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="latInput">Szerokość geograficzna:</label>
            <input id="latInput" type="text" value={clickedPos.lat} onChange={(e) => onChangeLatLng('lat', e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="lngInput">Długość geograficzna:</label>
            <input id="lngInput" type="text" value={clickedPos.lng} onChange={(e) => onChangeLatLng('lng', e)}></input>
          </div>
        </div>
        <label htmlFor="pointNameInput">Nazwa punktu:</label>
        <input id="pointNameInput" type="text" value={pointName} onChange={(e) => setPointName(e.target.value)} required></input>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pointTypeSelect">Typ punktu:</label>
            <select id="pointIconSelect" onChange={(e) => setPointType(e.target.value)}>
              {Object.keys(icons).map((a) => (
                <option value={a} key={a}>{mapType(a)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pointTimestampInput">Data i czas:</label>
            <input id="pointTimestampInput" type="datetime-local" value={pointTimeStamp} onChange={onChangeDateTime} disabled={timeUpdate}></input>
          </div>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" onChange={onCheckedAutoTime} />
          Automatyczne ustawienie czasu
        </label>

        <div className="form-group">
          <label htmlFor="imgTextarea">Obraz (Base64):</label>
          <textarea id="imgTextarea" cols={20} onChange={(e) => setImg64(e.target.value)} value={img64}></textarea>
        </div>

        <button onClick={onSubmit}>Dodaj punkt</button>
      </div>
    </div>
  );
}
