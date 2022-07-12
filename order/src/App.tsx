import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import PrivateRoutes from "components/PrivateRouter";

import "./assets/styles/globals.scss";
import "antd/dist/antd.css";
import HomeLayout from "pages/HomePage/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/order/*" element={<PrivateRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
