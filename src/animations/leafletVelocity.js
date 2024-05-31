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
          maxVelocity: 0.6,
          velocityScale: 0.1,
          colorScale: ["green", "orange", "#CCCCFF"],
        });

        if (ref.current && windGlobalLayer)
          ref.current.addOverlay(windGlobalLayer, "Wind - Global");
      })
      .catch((err) => console.log(err));

    // fetch("https://onaci.github.io/leaflet-velocity/wind-gbr.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!mounted) return;

    //     windGbrLayer = L.velocityLayer({
    //       displayValues: true,
    //       displayOptions: {
    //         velocityType: "GBR Wind",
    //         position: "bottomleft",
    //         emptyString: "No wind data",
    //         showCardinal: true
    //       },
    //       data,
    //       maxVelocity: 10
    //     });

    //     if (ref.current && windGbrLayer)
    //       ref.current.addOverlay(windGbrLayer, "Wind - Great Barrier Reef");
    //   })
    //   .catch((err) => console.log(err));

    // fetch("https://onaci.github.io/leaflet-velocity/water-gbr.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!mounted) return;

    //     waterGbrLayer = L.velocityLayer({
    //       displayValues: true,
    //       displayOptions: {
    //         velocityType: "GBR Water",
    //         position: "bottomleft",
    //         emptyString: "No water data"
    //       },
    //       data: data,
    //       maxVelocity: 0.6,
    //       velocityScale: 0.1 // arbitrary default 0.005
    //     });

    //     if (ref.current && waterGbrLayer)
    //       ref.current.addOverlay(
    //         waterGbrLayer,
    //         "Ocean Current - Great Barrier Reef"
    //       );
    //   })
    //   .catch((err) => console.log(err));

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
