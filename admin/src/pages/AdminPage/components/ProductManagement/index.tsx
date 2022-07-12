import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";

import AddProduct from "./Add";
import ProductInformation from "./Information";
import UpdateProduct from "./Update";

const ProductManagement = () => {
  return (
    <Routes>
      <Route index element={<ProductInformation />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/update/:id" element={<UpdateProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProductManagement;
