import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [style, setStyle] = useState("STREETS.DARK");

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.DARK,
      center: [100.5018, 13.7563], // Bangkok coordinates
      zoom: 12,
    });

    // Add marker for Bangkok
    const marker = new maptilersdk.Marker()
      .setLngLat([100.5018, 13.7563])
      .addTo(map.current);

    // Handle missing style images
    map.current.on("styleimagemissing", (e) => {
      const id = e.id; // id of the missing image
      // Create a placeholder image or load the missing image
      const img = new Image();
      img.onload = () => {
        if (!map.current.hasImage(id)) {
          map.current.addImage(id, img);
        }
      };
      // Set a default image URL or handle the missing image appropriately
      img.src = `https://api.maptiler.com/maps/style-images/${id}.png?key=${
        import.meta.env.VITE_MAPTILER_API_KEY
      }`;
    });

    // Error handling for the map
    map.current.on("error", (e) => {
      console.error("Map error:", e.error);
    });
  }, []);

  // Handle style change
  const handleStyleChange = (e) => {
    const styleCode = e.target.value.split(".");

    if (styleCode.length === 2) {
      map.current.setStyle(maptilersdk.MapStyle[styleCode[0]][styleCode[1]]);
    } else {
      // Handle both MapStyle constants and custom style IDs
      map.current.setStyle(maptilersdk.MapStyle[styleCode[0]] || styleCode[0]);
    }

    setStyle(e.target.value);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        <div className="relative">
          {/* Map container with adjusted height */}
          <div
            ref={mapContainer}
            className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-300"
          />

          <select
            className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm shadow-sm"
            value={style}
            onChange={handleStyleChange}
          >
            <optgroup label="Navigation and city exploration">
              <option value="STREETS">STREETS</option>
              <option value="STREETS.DARK">STREETS.DARK</option>
              <option value="STREETS.LIGHT">STREETS.LIGHT</option>
              <option value="STREETS.PASTEL">STREETS.PASTEL</option>
            </optgroup>
            <option value="OUTDOOR">OUTDOOR</option>
            <option value="WINTER">WINTER</option>
            <option value="SATELLITE">SATELLITE</option>
            <option value="HYBRID">HYBRID</option>
            <optgroup label="Data visualization">
              <option value="DATAVIZ">DATAVIZ</option>
              <option value="DATAVIZ.DARK">DATAVIZ.DARK</option>
              <option value="DATAVIZ.LIGHT">DATAVIZ.LIGHT</option>
            </optgroup>
            <option value="e4e704fd-bdaa-4a54-a6d5-50f1b07d9d68">Coffee</option>
            <option value="f38285f4-f75f-486a-9127-0cc7a7358ae6">Beer</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Map;
