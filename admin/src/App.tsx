import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import PrivateRoutes from "components/PrivateRouter";
import LoginPage from "pages/LoginPage";

import "./assets/styles/globals.scss";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
