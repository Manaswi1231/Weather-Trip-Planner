import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RouteDirections from "../components/RouteDirections";

// Fix default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ORS_API_KEY = "5b3ce3597851110001cf624866e4b00f6f40457a927fb9875f4c1445";
const center = [20.5937, 78.9629]; // India center

const RouteMapPage = ({ userLocation, location }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    // Automatically fill in if props are passed
    if (userLocation?.city) setFrom(userLocation.city);
    if (location) setTo(location);
  }, [userLocation, location]);

  const getCoordinates = async (place) => {
    const response = await axios.get(
      `https://api.openrouteservice.org/geocode/search`,
      {
        params: {
          api_key: ORS_API_KEY,
          text: place,
        },
      }
    );
    const coords = response.data.features[0]?.geometry.coordinates;
    return coords ? [coords[1], coords[0]] : null; // [lat, lng]
  };

  const handleRoute = async () => {
    try {
      const fromCoords = await getCoordinates(from);
      const toCoords = await getCoordinates(to);

      if (!fromCoords || !toCoords) {
        alert("Could not geocode one of the locations.");
        return;
      }

      const routeRes = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
        {
          coordinates: [
            [fromCoords[1], fromCoords[0]],
            [toCoords[1], toCoords[0]],
          ],
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const coords = routeRes.data.features[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );

      setRouteCoords(coords);
    } catch (error) {
      console.error("❌ Routing failed:", error);
      alert("Could not fetch route. Please try different locations.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Route Map (OpenRouteService)
      </h2>

      {/* Manual input as fallback */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flex: "1 1 200px",
          }}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flex: "1 1 200px",
          }}
        />
        <button
          onClick={handleRoute}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Show Route
        </button>
      </div>

      {/* Map display */}
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeCoords.length > 0 && (
          <>
            <Marker position={routeCoords[0]} />
            <Marker position={routeCoords[routeCoords.length - 1]} />
            <Polyline positions={routeCoords} color="blue" />
          </>
        )}
      </MapContainer>

      {/* ✅ Auto-render RouteDirections if dynamic values are available */}
      {userLocation?.city && location && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Directions Summary
          </h3>
          <RouteDirections from={userLocation.city} to={location} />
        </div>
      )}
    </div>
  );
};

export default RouteMapPage;
