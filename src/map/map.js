import React, { useEffect, useState, useContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";

import Sidebar from "./sidebar";

function Map() {
  const [zoomLevel, setZoomLevel] = useState(15);
  const [markerPosition, setMarkerPosition] = useState([23.825292, 90.620816]);

  let mapOptions = {
    zoom: 15,
    center: [23.823049134162396, 90.62156238224219],
  };

  let initialZoom = 15;

  return (
    <>
      <MapContainer
        // center={[23.825292, 90.620816]} //bangladesh
        center={markerPosition}
        zoom={15}
        // zoom={zoomLevel}
        maxZoom={20}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute", // Add this line
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
        }}
      >
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="General Map">
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Hybrid Map">
            <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Openstreet Map">
            <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Satelite Map">
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
          </LayersControl.BaseLayer>
        </LayersControl>

        


      </MapContainer>
    </>
  );
}

export default Map;
