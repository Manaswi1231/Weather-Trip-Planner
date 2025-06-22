import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = ({ places, center }) => {
  if (!center) return null;

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
      />
      {places.map((place, idx) => (
        <Marker
          key={idx}
          position={[
            place.geometry.coordinates[1],
            place.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <strong>{place.properties.name}</strong>
            {place.image && (
              <img
                src={place.image}
                alt={place.properties.name}
                style={{ width: "100px", marginTop: "5px" }}
              />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
