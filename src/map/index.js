import React from "react";
import Sidebar from "./sidebar";
import Map from "./map";
import "./index.css";

function Index() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <div style={{ width: "20vw", height: "100vh", overflow: "auto", }}>
        <Sidebar style={{ zIndex: 999, }} />
      </div>
      <div style={{ width: "80vw", height: "100vh" }}>
        <Map />
      </div>
    </div>
  );
}

export default Index;
