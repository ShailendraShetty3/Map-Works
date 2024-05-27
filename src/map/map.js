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
import { Menu, Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { useSelector, useDispatch } from "react-redux";

import building from "../Geojson-Data/building";
import boundary from "../Geojson-Data/boundary";
import road from "../Geojson-Data/road.json";
import park from "../Geojson-Data/parks.json";

import storm_water_line from "../Geojson-Data/stormwaterLine";
import storm_drain from "../Geojson-Data/stormwaterDrain";

import manhole from "../Geojson-Data/manHole.json";
import sewageLine from "../Geojson-Data/sewageLine";
import sewage_chamber from "../Geojson-Data/sewageChamber.json";

import { customIcon, manholeIcon, stormDrainIcon } from "./icons";

const { SubMenu } = Menu;

function Map() {
  const checkbox = useSelector((state) => state.checkbox.CheckboxValue);

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

  const [selectedPolyline, setSelectedPolyline] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`<p>${feature.properties.name}</p>`);
    } else {
      layer.bindPopup(`<p>Park</p>`);
    }
  };

  const handleSidebar = () => {
    console.log("sidebar value is " + sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const onClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {}, [checkbox]);

  return (
    <MapContainer
      // center={[23.825292, 90.620816]} //bangladesh
      center={markerPosition}
      zoom={15}
      // zoom={zoomLevel}
      // maxZoom={20}
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

      <Button
        type="primary"
        style={{
          zIndex: 999,
          backgroundColor: "white",
          width: "3rem",
          height: "3rem",
          position: "absolute",
          right: "0",
          top: "15%",
          transform: "translateY(-50%)",
          marginRight: "1%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "50px black",
          padding: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
        </svg>
      </Button>

      <ZoomControl position="bottomright" />

      {checkbox.includes("Manhole")
        ? manhole.features.map((feature, index) => (
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

      {checkbox.includes("Sewage Chamber")
        ? sewage_chamber.features.map((feature, index) => (
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
      

      

      {checkbox.includes("Sewage Line")
        ? sewageLine[0].features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="black"
            >
              <Popup>
                <p>Sewage Line Name: {feature.properties.name || "Unknown"}</p>
                <p>
                  Additional Info:{" "}
                  {feature.properties.info || "No additional info"}
                </p>
              </Popup>
            </Polyline>
          ))
        : null}
      
      {popupPosition && selectedPolyline && (
        <Popup position={popupPosition}>
          <div>Sewage Line: Line 1</div>
        </Popup>
      )}

      {checkbox.includes("Storm Water Drainage")
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

      {checkbox.includes("Storm Water Drain")
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

      {checkbox.includes("Building Footprint") ? (
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

      {checkbox.includes("Boundary") ? (
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

      {/* {checkbox.includes("Road")
        ? road[0].features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="black"
            >
              <Popup>
                <p>Road Name: {feature.properties.name || "Unknown"}</p>
                <p>
                  Additional Info:{" "}
                  {feature.properties.info || "No additional info"}
                </p>
              </Popup>
            </Polyline>
          ))
        : null} */}
      
      {checkbox.includes("Road")
        ? road.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="black"
            >
              <Popup>
                <p>Road Name: {feature.properties.name || "Unknown"}</p>
                <p>
                  Additional Info:{" "}
                  {feature.properties.info || "No additional info"}
                </p>
              </Popup>
            </Polyline>
          ))
        : null}

      {checkbox.includes("Parks") ? (
        <GeoJSON
          data={park}
          style={{
            color: "black",
            fillColor: "#00FF00",
            fillOpacity: 0.6,
            weight: 2,
          }}
          onEachFeature={onEachFeature}
        />
      ) : null}
    </MapContainer>
  );
}

export default Map;
