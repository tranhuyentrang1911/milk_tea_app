import { UpdateUser, User } from "models";

import axiosClient from "./axiosClient";

const UserApi = {
  // getAll(params: ListParams): Promise<ListResponse<Product>> {
  //   const url = "/products";
  //   return axiosClient.get(url, { params });
  // },

  getAll(): Promise<User[]> {
    const url = "/users";
    return axiosClient.get(url);
  },

  getById(id: number | string): Promise<User> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  add(data: User): Promise<User> {
    const url = "/users";
    return axiosClient.post(url, data);
  },

  update(data: Partial<UpdateUser>): Promise<User> {
    const url = `/users/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: number | string): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};
export default UserApi;
