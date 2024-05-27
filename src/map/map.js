// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   LayersControl,
//   Polyline,
//   GeoJSON,
//   ZoomControl,
//   Marker,
//   Popup,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useSelector } from "react-redux";

// import building from "../Geojson-Data/building";
// import boundary from "../Geojson-Data/boundary";
// import road from "../Geojson-Data/road";

// import storm_water_line from "../Geojson-Data/stormwaterLine";
// import storm_drain from "../Geojson-Data/stormwaterDrain";

// import manhole from "../Geojson-Data/manHole";
// import sewageLine from "../Geojson-Data/sewageLine";
// import sewage_chamber from "../Geojson-Data/sewageChamber";

// import { customIcon, manholeIcon, stormDrainIcon } from "./icons";

// const { BaseLayer } = LayersControl;

// function Map() {
//   const sewage = useSelector((state) => state.checkbox.CheckboxValue);

//   const [markerPosition, setMarkerPosition] = useState([
//     19.048980241105, 72.82506531582413,
//   ]);

//   useEffect(() => {
//     console.log("value of sidebar in map " + sewage);
//   }, [sewage]);

//   return (
//     <MapContainer
//       center={markerPosition}
//       zoom={15}
//       maxZoom={20}
//       style={{ width: "100%", height: "100%" }}
//       zoomControl={false}
//     >
//       <LayersControl position="topright">
//         <BaseLayer checked name="General Map">
//           <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
//         </BaseLayer>
//         <BaseLayer name="Hybrid Map">
//           <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga" />
//         </BaseLayer>
//         <BaseLayer name="Openstreet Map">
//           <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
//         </BaseLayer>
//         <BaseLayer name="Satelite Map">
//           <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
//         </BaseLayer>
//       </LayersControl>

//       <ZoomControl position="bottomright" />

//       {sewage.includes("Manhole") &&
//         manhole[0].features.map((feature, index) => (
//           <Marker
//             key={index}
//             position={[
//               feature.geometry.coordinates[1],
//               feature.geometry.coordinates[0],
//             ]}
//             icon={manholeIcon}
//           >
//             <Popup>
//               <p>data</p>
//             </Popup>
//           </Marker>
//         ))}

//       {sewage.includes("Sewage Chamber") &&
//         sewage_chamber[0].features.map((feature, index) => (
//           <Marker
//             key={index}
//             position={[
//               feature.geometry.coordinates[1],
//               feature.geometry.coordinates[0],
//             ]}
//             icon={customIcon}
//           >
//             <Popup>
//               <p>data</p>
//             </Popup>
//           </Marker>
//         ))}

//       {sewage.includes("Sewage Line") &&
//         sewageLine.features.map((feature, index) => (
//           <Polyline
//             key={index}
//             positions={feature.geometry.coordinates.map((coord) => [
//               coord[1],
//               coord[0],
//             ])}
//             color="red"
//           />
//         ))}

//       {sewage.includes("Storm Water Drainage") &&
//         storm_water_line.features.map((feature, index) => (
//           <Polyline
//             key={index}
//             positions={feature.geometry.coordinates.map((coord) => [
//               coord[1],
//               coord[0],
//             ])}
//             color="blue"
//           />
//         ))}

//       {sewage.includes("Storm Water Drain") &&
//         storm_drain[0].features.map((feature, index) => (
//           <Marker
//             key={index}
//             position={[
//               feature.geometry.coordinates[1],
//               feature.geometry.coordinates[0],
//             ]}
//             icon={stormDrainIcon}
//           >
//             <Popup>
//               <p>data</p>
//             </Popup>
//           </Marker>
//         ))}

//       {sewage.includes("Building Footprint") && (
//         <GeoJSON
//           data={building}
//           style={{
//             color: "black",
//             fillColor: "yellow",
//             fillOpacity: 0.6,
//             weight: 2,
//           }}
//         />
//       )}

//       {sewage.includes("Boundary") && (
//         <GeoJSON
//           data={boundary}
//           style={{
//             color: "green",
//             fillColor: "black",
//             fillOpacity: 0,
//             weight: 2,
//           }}
//         />
//       )}

//       {sewage.includes("Road") &&
//         road[0].features.map((feature, index) => (
//           <Polyline
//             key={index}
//             positions={feature.geometry.coordinates.map((coord) => [
//               coord[1],
//               coord[0],
//             ])}
//             color="blue"
//           />
//         ))}
//     </MapContainer>
//   );
// }

// export default Map;













import React, { useEffect, useState, useContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Polyline,
  Polygon,
  GeoJSON,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Menu, Drawer } from "antd";

import "./index.css";
import { useSelector, useDispatch } from "react-redux";

import building from "../Geojson-Data/building";
import boundary from "../Geojson-Data/boundary";
import road from "../Geojson-Data/road";

import storm_water_line from "../Geojson-Data/stormwaterLine";
import storm_drain from "../Geojson-Data/stormwaterDrain";

import manhole from "../Geojson-Data/manHole";
import sewageLine from "../Geojson-Data/sewageLine";
import sewage_chamber from "../Geojson-Data/sewageChamber";

import { customIcon, manholeIcon, stormDrainIcon } from "./icons";

const { SubMenu } = Menu;

function Map() {
  const sewage = useSelector((state) => state.checkbox.CheckboxValue);

  ///
  const [zoomLevel, setZoomLevel] = useState(15);
  const [markerPosition, setMarkerPosition] = useState([
    19.048980241105, 72.82506531582413,
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let mapOptions = {
    zoom: 15,
    center: [73.09997004514011, 19.129098735949114],
  };

  let initialZoom = 15;

  const handleSidebar = () => {
    console.log("sidebar value is " + sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const onClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    console.log("value of sidebar in map " + sewage);
  }, [sewage]);

  return (
    <MapContainer
      // center={[23.825292, 90.620816]} //bangladesh
      center={markerPosition}
      zoom={15}
      // zoom={zoomLevel}
      maxZoom={20}
      style={{
        width: "100%",
        height: "100%",
      }}
      zoomControl={false}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="General Map">
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Hybrid Map">
          <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Openstreet Map">
          <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Satelite Map">
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
        </LayersControl.BaseLayer>
      </LayersControl>

      <ZoomControl position="bottomright" />

      {sewage.includes("Manhole")
        ? manhole[0].features.map((feature, index) => (
            <Marker
              key={index}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              icon={manholeIcon}
            >
              <Popup>
                <p>data</p>
              </Popup>
            </Marker>
          ))
        : null}

      {sewage.includes("Sewage Chamber")
        ? sewage_chamber[0].features.map((feature, index) => (
            <Marker
              key={index}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              icon={customIcon}
            >
              <Popup>
                <p>data</p>
              </Popup>
            </Marker>
          ))
        : null}

      {sewage.includes("Sewage Line")
        ? sewageLine.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="red"
            />
          ))
        : null}

      {sewage.includes("Storm Water Drainage")
        ? storm_water_line.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="blue"
            />
          ))
        : null}

      {sewage.includes("Storm Water Drain")
        ? storm_drain[0].features.map((feature, index) => (
            <Marker
              key={index}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              icon={stormDrainIcon}
            >
              <Popup>
                <p>data</p>
              </Popup>
            </Marker>
          ))
        : null}

      {sewage.includes("Building Footprint") ? (
        <GeoJSON
          data={building}
          style={{
            color: "black",
            fillColor: "yellow",
            fillOpacity: 0.6,
            weight: 2,
          }}
        />
      ) : null}

      {sewage.includes("Boundary") ? (
        <GeoJSON
          data={boundary}
          style={{
            color: "green",
            fillColor: "black",
            fillOpacity: 0,
            weight: 2,
          }}
        />
      ) : null}

      {sewage.includes("Road")
        ? road[0].features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="blue"
            />
          ))
        : null}
    </MapContainer>
  );
}

export default Map;
