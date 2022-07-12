import { Cart, EditCart } from "models";
import axiosClient from "./axiosClient";

const CartApi = {
  getAll(id: string): Promise<Cart[]> {
    const url = `/cart?userId=${id}`;
    return axiosClient.get(url);
  },
  add(data: Cart): Promise<Cart> {
    const url = `/cart`;
    return axiosClient.post(url, data);
  },
  update(data: EditCart): Promise<EditCart> {
    const url = `/cart/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string): Promise<any> {
    const url = `/cart/${id}`;
    return axiosClient.delete(url);
  },
};
export default CartApi;
