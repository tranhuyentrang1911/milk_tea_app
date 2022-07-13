export interface User {
  id?: string;
  name: string;
  phone: number;
  pass: string;

  createdAt?: number;
  updatedAt?: number;
}
export interface UpdateUser {
  id: string;
  name?: string;
  phone?: number;
  pass?: string;

  createdAt?: number;
  updatedAt?: number;
}
