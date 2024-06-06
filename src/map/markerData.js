import React from "react";

import { ReactComponent as MarkerCloud } from "../Images/map.svg";
import { ReactComponent as MarkerHumidity } from "../Images/map.svg";
import { ReactComponent as MarkerIcon } from "../Images/map.svg";
import { ReactComponent as MarkerPressureIcon } from "../Images/map.svg";
import { ReactComponent as MarkerRainIcon } from "../Images/map.svg";
import { ReactComponent as MarkerWind } from "../Images/map.svg";
// import { ReactComponent as Sunrise } from "../Images/map.svg";
// import { ReactComponent as Sunset } from "../Images/map.svg";

import Sunrise from "../Images/sunrise.png";
import Sunset from "../Images/sunset.png";

import { Button, Col, Row, Space } from "antd";

export default function MarkerData() {

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* <MarkerIcon /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Header>{data.current.origin_details}</Header> */}
            <h3>Thu, Jun, 06</h3>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>25 C</h2>
          <h3>light Rain</h3>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space direction="vertical" align="center">
          {/* <MarkerWind /> */}
          <h5>16.75 kmph</h5>
          <h5>Wind</h5>
        </Space>
        <Space direction="vertical" align="center">
          {/* <MarkerCloud /> */}
          <h5>98%</h5>
          <h5>Clouds</h5>
        </Space>
        <Space direction="vertical" align="center">
          {/* <MarkerPressureIcon /> */}
          <h5>1006 hPa</h5>
          <h5>Pressure</h5>
        </Space>
        <Space direction="vertical" align="center">
          {/* <MarkerRainIcon /> */}
          <h5>0.1 mm</h5>
          <h5>Rain</h5>
        </Space>
        <Space direction="vertical" align="center">
          {/* <MarkerHumidity /> */}
          <h5>60%</h5>
          <h5>Humidity</h5>
        </Space>
      </div>
      <br />
      <Row>
        <Col span={12} style={{ display: "flex" }}>
          <img src={Sunrise} alt="Sunrise Icon" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5>Sunrise</h5>
            <h5>06:00</h5>
          </div>
        </Col>
        <Col span={12} style={{ display: "flex" }}>
        <img src={Sunset} alt="Sunrise Icon" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5>Sunset</h5>
            <h5>18:43</h5>
          </div>
        </Col>
      </Row>
      <br />
      <center>
        <a
          style={{ cursor: "pointer" }}
        //   onClick={() => dispatch(setClientForecast(true))}
        >
          View Weather Forecast
        </a>
      </center>
    </div>
  );
}
