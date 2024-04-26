import React, { useState, createContext, useEffect } from "react";
import { Marker, Drawer, Button, Radio, Space, Tooltip, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "./sidebar";
import Map from "./map";

export const MapContext = createContext();

function Index() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>

        <Map />
    </div>
  );
}

export default Index;
