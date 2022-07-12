import { Category } from "models";

import axiosClient from "./axiosClient";

const CategoryApi = {
  // getAll(params: ListParams): Promise<ListResponse<Product>> {
  //   const url = "/products";
  //   return axiosClient.get(url, { params });
  // },
  getAll(): Promise<Category[]> {
    const url = "/category";
    return axiosClient.get(url);
  },

  getById(id: number | string): Promise<Category> {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  add(data: Category): Promise<Category> {
    const url = "/category";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Category>): Promise<Category> {
    const url = `/category/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: number | string): Promise<any> {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
};
export default CategoryApi;
