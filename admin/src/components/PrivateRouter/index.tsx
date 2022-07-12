import { Navigate } from "react-router-dom";

import AdminLayout from "pages/AdminPage/layout";

const PrivateRoutes = () => {
  return localStorage.getItem("admin") ? <AdminLayout /> : <Navigate to="/" />;
};

export default PrivateRoutes;
