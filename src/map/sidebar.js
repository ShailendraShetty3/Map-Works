import React, { useState, createContext, useEffect } from "react";
import {
  Checkbox,
} from "antd";
import "./index.css";

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { updateCheckedValue } from '../redux/reducer';


const CheckboxGroup = Checkbox.Group;

const sewageOptions = ["Manhole", "Sewage Chamber", "Sewage Line"];
const stormOptions = ["Storm Water Drain", "Storm Water Drainage"];
const buildingOptions = ["Building Footprint", "Road", "Boundary", "Parks"];

function Sidebar() {
  const dispatch = useDispatch();
  //sewage
  const [checkedListSewage, setCheckedListSewage] = useState([]);
  const [indeterminateSewage, setIndeterminateSewage] = useState(false);
  const [checkAllSewage, setCheckAllSewage] = useState(false);

  //storm water
  const [checkedListStorm, setCheckedListStorm] = useState([]);
  const [indeterminateStorm, setIndeterminateStorm] = useState(false);
  const [checkAllStorm, setCheckAllStorm] = useState(false);

  //storm water
    const [checkedListBuilding, setCheckedListBuilding] = useState([]);
    const [indeterminateBuilding, setIndeterminateBuilding] = useState(false);
  const [checkAllBuilding, setCheckAllBuilding] = useState(false);





  useEffect(() => {
    const mergedList = [...checkedListSewage, ...checkedListStorm, ...checkedListBuilding];

    dispatch(updateCheckedValue(mergedList));
  }, [checkedListSewage, checkedListStorm, checkedListBuilding, dispatch]);

  

  const handleCheckAll = (
    e,
    setCheckedList,
    setIndeterminate,
    setCheckAll,
    options
  ) => {
    const checkedList = e.target.checked ? options : [];
    // const isChecked = e.target.checked;
    // const checkedList = isChecked ? options : [];

    setCheckedList(checkedList);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    // isChecked?(
    //   dispatch(updateSewageValue(options))
    //  ):(
    //   dispatch(updateSewageValue([]))
    // )
  };

  const onChangeSewage = (checkedListSewage) => {
    setCheckedListSewage(checkedListSewage);
    setIndeterminateSewage(
      !!checkedListSewage.length &&
        checkedListSewage.length < sewageOptions.length
    );
    setCheckAllSewage(checkedListSewage.length === sewageOptions.length);

    // dispatch(updateSewageValue(checkedListSewage))
  };

  const onCheckAllSewage = (e) => {
    setCheckedListSewage(e.target.checked ? sewageOptions : []);
    setIndeterminateSewage(false);
    setCheckAllSewage(e.target.checked);
  };

  const onChangeStorm = (checkedListStorm) => {
    setCheckedListStorm(checkedListStorm);
    setIndeterminateStorm(
      !!checkedListStorm.length && checkedListStorm.length < stormOptions.length
    );
    setCheckAllStorm(checkedListStorm.length === stormOptions.length);
  };

  const onCheckAllStorm = (e) => {
    setCheckedListStorm(e.target.checked ? stormOptions : []);
    setIndeterminateStorm(false);
    setCheckAllStorm(e.target.checked);
  };

  const onChangeBuilding = (checkedListBuilding) => {
    setCheckedListBuilding(checkedListBuilding);
    setIndeterminateBuilding(
      !!checkedListBuilding.length && checkedListBuilding.length < buildingOptions.length
    );
    setCheckAllBuilding(checkedListBuilding.length === buildingOptions.length);
  };



  useEffect(() => {
    console.log(checkedListSewage);
  }, [checkedListSewage, checkedListStorm]);

  return (
    <div style={{ width: "100%", color: "black" }}>
      <div className="checkbox_margin" style={{marginTop:"1rem"}}>
        <Checkbox
          indeterminate={indeterminateSewage}
          onChange={(e) => {
            handleCheckAll(
              e,
              setCheckedListSewage,
              setIndeterminateSewage,
              setCheckAllSewage,
              sewageOptions
            );
          }}
          checked={checkAllSewage}
        >
          Sewage Layer
        </Checkbox>
        

        <CheckboxGroup
          options={sewageOptions}
          value={checkedListSewage}
          onChange={onChangeSewage}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
            marginTop:".7rem"
          }}
        />
      </div>
      <div className="checkbox_margin" style={{marginTop:"1rem"}}>
        <Checkbox
          indeterminate={indeterminateStorm}
          onChange={(e) => {
            handleCheckAll(
              e,
              setCheckedListStorm,
              setIndeterminateStorm,
              setCheckAllStorm,
              stormOptions
            );
          }}
          checked={checkAllStorm}
        >
          Storm Water Layer
        </Checkbox>

        <CheckboxGroup
          options={stormOptions}
          value={checkedListStorm}
          onChange={onChangeStorm}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
            marginTop:".7rem"
          }}
        />
      </div>
      <div className="checkbox_margin" style={{marginTop:"1rem"}}>
        <Checkbox
          indeterminate={indeterminateBuilding}
          onChange={(e) => {
            handleCheckAll(
              e,
              setCheckedListBuilding,
              setIndeterminateBuilding,
              setCheckAllBuilding,
              buildingOptions
            );
          }}
          checked={checkAllBuilding}
        >
          Buildings & Roads
        </Checkbox>

        <CheckboxGroup
          options={buildingOptions}
          value={checkedListBuilding}
          onChange={onChangeBuilding}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
            marginTop:".7rem"
          }}
        />
      </div>


    </div>
  );
}

export default Sidebar;
