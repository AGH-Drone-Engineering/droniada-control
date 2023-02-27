import { MapContainer, TileLayer } from 'react-leaflet';
import './index.css';
import Header from '../Header';
import Points from '../Points';
import UnorderedPoints from '../UnorderedPoints';

export default function App() {
  // Katowice Muchowiec
  const position = { lat: 50.238284041030674, lng: 19.032943917374634 };

  return (
    <div className='App'>

      <Header></Header>
      <hr></hr>

      <main>
        <div className='map-wrapper'>
          <MapContainer center={position} zoom={17} style={{ height: '100%' }}>
            <TileLayer
              url='https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg?access_token=pk.eyJ1IjoiYWdoLWRlIiwiYSI6ImNsZWxvajl3dDBtd3Qzd29kcnY4YjFxbmMifQ.xUC7tSyVs0LcHrdAf3XNgA'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Points></Points>
          </MapContainer>
        </div>
        <div className='right-list'>
            <h2><u>Znalezione punkty</u></h2>
            <UnorderedPoints></UnorderedPoints>
        </div>
      </main>

    </div>
  );
}
