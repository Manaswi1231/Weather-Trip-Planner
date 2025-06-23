import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { getImageForPlace } from "../utils/getImage";
import MapView from "../components/MapView";
import { useFavorites } from "../context/FavoritesContext";

const GEO_KEY = "559f2b49894246ec960e6e7990a09295";

const VisitingPlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [centerLat, setCenterLat] = useState(null);
  const [centerLon, setCenterLon] = useState(null);

  const { addFavorite } = useFavorites();
  const location = new URLSearchParams(useLocation().search).get("location");

  const fetchFromGeoapify = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=tourism.sights,entertainment,cultural,religion,natural&filter=circle:${lon},${lat},30000&limit=50&apiKey=${GEO_KEY}`
      );
      return res.data.features;
    } catch (e) {
      console.error("Geoapify fetch error:", e);
      return [];
    }
  };

  const fetchFromWikipedia = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=geosearch&gsradius=30000&gscoord=${lat}|${lon}&gslimit=50&format=json`
      );
      const pages = res.data.query?.geosearch || [];
      return pages.map((p) => ({
        properties: {
          name: p.title,
          formatted: `Approx. ${p.dist}m away`,
          categories: ["Wikipedia"],
        },
        geometry: {
          coordinates: [lon, lat],
        },
      }));
    } catch (e) {
      console.error("Wikipedia fetch error:", e);
      return [];
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const geo = await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${GEO_KEY}`
        );
        const prop = geo.data.features[0]?.properties;
        if (!prop) throw new Error("No location found");

        const { lat, lon } = prop;
        setCenterLat(lat);
        setCenterLon(lon);

        let rawPlaces = await fetchFromGeoapify(lat, lon);

        if (!rawPlaces || rawPlaces.length === 0) {
          rawPlaces = await fetchFromWikipedia(lat, lon);
        }

        const seen = new Set();
        const filtered = rawPlaces.filter((place) => {
          const name = place.properties.name;
          return (
            name &&
            /^[A-Za-z0-9\s.,()'-]+$/.test(name) &&
            !seen.has(name) &&
            seen.add(name)
          );
        });

        const enriched = await Promise.all(
          filtered.map(async (place) => {
            const image = await getImageForPlace(place.properties.name);
            return { ...place, image };
          })
        );

        setPlaces(enriched);
      } catch (e) {
        console.error("Fetching places failed:", e);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchPlaces();
  }, [location]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tourist Places in {location}</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : places.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No places found. Try a nearby city or expand radius.
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, index) => (
              <li key={index} className="p-4 border rounded shadow bg-white">
                <img
                  src={
                    place.image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={place.properties.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">
                  {place.properties.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {place.properties.formatted}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Category: {place.properties.categories?.[0]}
                </p>
                <button
                  onClick={() => addFavorite(place)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save to Favorites
                </button>
              </li>
            ))}
          </ul>

          {places.length > 0 && centerLat && centerLon && (
            <MapView places={places} center={[centerLat, centerLon]} />
          )}
        </>
      )}
    </div>
  );
};

export default VisitingPlacesPage;
