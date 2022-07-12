import { ListParams, ListResponse, Promotion } from "models";

import axiosClient from "./axiosClient";

const PromotionApi = {
  getWithPagination(params: ListParams): Promise<ListResponse<Promotion>> {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getAll(): Promise<Promotion[]> {
    const url = "/promotion";
    return axiosClient.get(url);
  },

  getById(id: number | string): Promise<Promotion> {
    const url = `/promotion/${id}`;
    return axiosClient.get(url);
  },

  add(data: Promotion): Promise<Promotion> {
    const url = "/promotion";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Promotion>): Promise<Promotion> {
    const url = `/promotion/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: number | string): Promise<any> {
    const url = `/promotion/${id}`;
    return axiosClient.delete(url);
  },
};
export default PromotionApi;
