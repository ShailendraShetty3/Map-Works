import L from 'leaflet';
import sewageChamberIcon from "../Images/sewageChamber.png";
import IconManhole from "../Images/manhole.png";
import IconstormDrain from "../Images/stormWaterDrain.png";

export const customIcon = new L.Icon({
    iconUrl: sewageChamberIcon,
    iconSize: [22, 30],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
});
  
export const manholeIcon = new L.Icon({
    iconUrl: IconManhole,
    iconSize: [22, 22],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
});
  
export const stormDrainIcon = new L.Icon({
    iconUrl: IconstormDrain,
    iconSize: [22, 22],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
  });
  
  
