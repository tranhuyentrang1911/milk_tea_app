import { Order } from "models";

import axiosClient from "./axiosClient";

const OrderApi = {
  // getAll(params: ListParams): Promise<ListResponse<Order>> {
  //   const url = "/Orders";
  //   return axiosClient.get(url, { params });
  // },
  getAll(): Promise<Order[]> {
    const url = "/order";
    return axiosClient.get(url);
  },

  getByCustomId(customId: number | string): Promise<Order[]> {
    const url = `/order?userId=${customId}`;
    return axiosClient.get(url);
  },

  add(data: Order): Promise<Order> {
    const url = "/order";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Order>): Promise<Order> {
    const url = `/order/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: number | string): Promise<any> {
    const url = `/order/${id}`;
    return axiosClient.delete(url);
  },
};
export default OrderApi;
