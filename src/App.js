import React, { useEffect } from "react";

import "./App.css";

import PublicPage from "./components/PublicPage";
import PrivatePage from "./components/PrivatePage";
import DoorClose from "../src/components/DoorClose";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DoorClose />} />
          <Route path="/mint" element={<PrivatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
