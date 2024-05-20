import React, { useEffect, useState, useContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  Polyline,
  Polygon,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { Button, Modal, Menu, Drawer } from "antd";

import Sidebar from "./sidebar";
import menuIcon from "../Images/menuIcon.png";
import menuCloseIcon from "../Images/menuCloseIcon.png";
import "./index.css";
import { useSelector, useDispatch } from 'react-redux';

import { MenuOutlined } from "@ant-design/icons";

import building from '../Geojson-Data/building'
import boundary from '../Geojson-Data/boundary'
import road from '../Geojson-Data/road'

const { SubMenu } = Menu;

function Map() {
  const sewage = useSelector((state) => state.sewageLayer.sewageValue);

  
  ///
  const [zoomLevel, setZoomLevel] = useState(15);
  const [markerPosition, setMarkerPosition] = useState([19.129098735949114, 73.09997004514011]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let mapOptions = {
    zoom: 15,
    center: [73.09997004514011, 19.129098735949114]
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
  },[sewage])

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

        <Button
          type="primary"
          size="small"
          onClick={handleSidebar}
          icon={sidebarOpen === false ? <img src={menuIcon} alt="Icon" />:<img src={menuCloseIcon} alt="Icon" />}
          style={{
            zIndex: 999,
            width: "2rem",
            height: "2rem",
            backgroundColor: "white",
            position: "absolute",
            marginTop: "92vh",
            marginLeft: "1%",
          }}
        />

        <Drawer
          title="Basic Drawer"
          placement="left"
          onClose={onClose}
          open={sidebarOpen}
          style={{
            transition: "none",
            width: "100%",
            height: "85%",
            marginLeft: "5%",
            marginTop: "5%",
            borderRadius: "5px",
          }}
        >
          <Sidebar />
        </Drawer>



        {sewage.includes('Manhole') ? (
        <GeoJSON
          data={building}
          style={{ color: "yellow", fillColor: "blue", fillOpacity: 1, weight: 2 }}
        />
      ) : null}

        <GeoJSON data={boundary}
        style={{color:"green", fillColor:"black", fillOpacity:.3, weight:2}}
        />
        
        {road[0].features.map((feature, index) => (
          <Polyline key={index} positions={feature.geometry.coordinates.map(coord => [coord[1], coord[0]])} color="blue" />
        ))}



      </MapContainer>
    </>
  );
}

export default Map;
