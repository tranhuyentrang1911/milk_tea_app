import { Navigate } from "react-router-dom";

import OrderLayout from "pages/OrderPage/layout";

const PrivateRoutes = () => {
  return localStorage.getItem("userCurrent") ? (
    <OrderLayout />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
