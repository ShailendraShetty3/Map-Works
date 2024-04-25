import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from './map/index.js'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<SignIn />} /> */}
          <Route exact path="/" element={<Home />} />
              

        </Routes>
      </BrowserRouter>
  );
}

export default App;
