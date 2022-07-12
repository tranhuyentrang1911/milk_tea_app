import { Auth, User } from "models";

import axiosClient from "./axiosClient";

export const AuthApi = {
  checkAuth(data: Auth): Promise<User[]> {
    const url = `/users?phone=${data.phone}&pass=${data.pass}`;
    return axiosClient.get(url);
  },
};
