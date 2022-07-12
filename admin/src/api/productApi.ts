import { Product } from "models";

import axiosClient from "./axiosClient";

const ProductApi = {
  // getAll(params: ListParams): Promise<ListResponse<Product>> {
  //   const url = "/products";
  //   return axiosClient.get(url, { params });
  // },
  getAll(): Promise<Product[]> {
    const url = "/products";
    return axiosClient.get(url);
  },

  getById(id: number | string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data: Product): Promise<Product> {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Product>): Promise<Product> {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: number | string): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default ProductApi;
