import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { forwardRef, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletVelocity = forwardRef((props, ref) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let mounted = true;
    let windGbrLayer;
    let waterGbrLayer;
    let windGlobalLayer;

    fetch("https://onaci.github.io/leaflet-velocity/wind-global.json")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        windGlobalLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "Global Wind",
            position: "bottomleft",
            emptyString: "No global wind data",
          },
          data: data,
          maxVelocity: 0.1,
          velocityScale: 0.1,
          colorScale: ["green", "orange", "#CCCCFF"],
        });

        if (ref.current && windGlobalLayer)
          ref.current.addOverlay(windGlobalLayer, "Wind - Global");
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
      if (ref.current) {
        ref.current.removeOverlay(windGbrLayer);
        ref.current.removeOverlay(waterGbrLayer);
        ref.current.removeOverlay(windGlobalLayer);
      }
    };
  }, [map]);

  return null;
});

export default LeafletVelocity;
