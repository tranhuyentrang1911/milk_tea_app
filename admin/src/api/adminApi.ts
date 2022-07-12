import { Admin } from "models";

import axiosClient from "./axiosClient";

const AdminApi = {
  checkAuth(data: Admin): Promise<Admin[]> {
    const url = `/admin?name=${data.name}&pass=${data.pass}`;
    return axiosClient.get(url);
  },
};
export default AdminApi;
