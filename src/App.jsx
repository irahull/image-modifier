import React, { useEffect, useRef, useState } from "react";
import "./app.scss";
import HomeScreen from "./screens/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CanvasComp from "./screens/canvas/Canvas";
const App = () => {
  const [imgUrl, setImgUrl] = useState(null);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<HomeScreen imgUrl={imgUrl} setImgUrl={setImgUrl} />}
          />
          <Route path="/edit" element={<CanvasComp imgUrl={imgUrl} />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
