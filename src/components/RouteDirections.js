import React, { useEffect, useRef } from "react";

const RouteDirections = ({ from, to }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    const loader = new window.google.maps.DirectionsService();
    const renderer = new window.google.maps.DirectionsRenderer();

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 6,
      center: { lat: 20.5937, lng: 78.9629 },
    });

    renderer.setMap(map);

    loader.route(
      {
        origin: from,
        destination: to,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          renderer.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [from, to]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Route Directions</h3>
      <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default RouteDirections;
