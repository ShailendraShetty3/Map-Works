import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

import './style.css';

import WindVelocity from "./data/wind-global.json";
const LeafletVelocity = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    let windGlobalLayer;

    // ------------------------------------------------------------------ for fetching data from object

    windGlobalLayer = L.velocityLayer({
      displayValues: true,
      displayOptions: {
        velocityType: "Global Wind",
        position: "bottomright",
        emptyString: "No global wind data",
      },
      data: WindVelocity,
      maxVelocity: 0.6,
      velocityScale: 0.1,
      colorScale: ["green", "orange", "#CCCCFF"],
    });

    if (windGlobalLayer) {
      windGlobalLayer.addTo(map);
    }

    // ----------------------------------------------------------------- for fetching from api

    // fetch("https://onaci.github.io/leaflet-velocity/wind-global.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     windGlobalLayer = L.velocityLayer({
    //       displayValues: true,
    //       displayOptions: {
    //         velocityType: "Global Wind",
    //         position: "bottomleft",
    //         emptyString: "No global wind data",
    //       },
    //       data: data,
    //       maxVelocity: 0.6,
    //       velocityScale: 0.1,
    //       colorScale: ["blue", "orange", "lightblue"],
    //     });

    //     if (windGlobalLayer) {
    //       windGlobalLayer.addTo(map);
    //     }
    //   })
    //   .catch((err) => console.log(err));

    // -------------------------------------------------------------

    return () => {
      if (windGlobalLayer) {
        map.removeLayer(windGlobalLayer);
      }
    };
  }, [map]);

  return null;
};

export default LeafletVelocity;
