import './App.css';
import Header from './Header';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { db } from './Firebase'
import { collection, getDocs } from 'firebase/firestore/lite';
import Points from './Points';


function App() {
  //Katowice Muchowiec 
  var position = { lat: 50.238284041030674, lng: 19.032943917374634 };

  return (
    <div className="App">

      <Header></Header>
      <hr></hr>
      <main>
      <div className='map-wrapper'>
        <MapContainer center={position} zoom={17} style={{ height: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Points></Points>
        </MapContainer>
      </div>
      <div className='right-list'>
        
      </div>
      </main>
     

    </div>
  );
}

export default App;
