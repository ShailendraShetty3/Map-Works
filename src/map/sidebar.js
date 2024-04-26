import React, { useState, createContext, useEffect } from "react";
import {
  Marker,
  Drawer,
  Button,
  Radio,
  Space,
  Tooltip,
  Modal,
  Checkbox,
} from "antd";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Manhole", "Sewage Network", "Infrastructure"];

function Sidebar() {
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (checkedList) => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    console.log(checkedList)
  },[checkedList])

  return (
    <div style={{ width: "100%", color:"black" }}>
      <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Infrastructure Layer
      </Checkbox>

      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
        style={{ display: "flex", flexDirection: "column", marginLeft: "30px" }}
      />
      </div>
      <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Infrastructure Layer
      </Checkbox>

      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
        style={{ display: "flex", flexDirection: "column", marginLeft: "30px" }}
      />
      </div>
    </div>
  );
}

export default Sidebar;
