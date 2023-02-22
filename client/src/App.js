import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';

function App() {
  const position = { lat: 51.505, lng: -0.09, zoom: 13 };
  return (
    <div className="App" id="map">
      <MapContainer center={[position.lat, position.lng]} zoom={position.zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
