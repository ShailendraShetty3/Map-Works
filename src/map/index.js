// import React, { useState, createContext, useEffect } from "react";
// import { Marker, Drawer, Button, Radio, Space, Tooltip, Modal } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import Sidebar from "./sidebar";
// import Map from "./map";

// export const MapContext = createContext();

// function Index() {
//   return (
//     <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
//       <div style={{ width: "20%", boxSizing: "border-box", overflow: "hidden" }}>
//         <Sidebar style={{ zIndex: 999 }} />
//       </div>
      
//       <div style={{ width: "80%", boxSizing: "border-box", overflow: "hidden" }}>
//         <Map />
//       </div>
//     </div>
//   );
// }

// export default Index;






import React from "react";
import Sidebar from "./sidebar";
import Map from "./map";

function Index() {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div style={{ width: "20%", height: "100vh", overflow: "auto", }}>
        <Sidebar style={{ zIndex: 999, }} />
      </div>
      <div style={{ width: "80%", height: "100vh" }}>
        <Map />
      </div>
    </div>
  );
}

export default Index;

