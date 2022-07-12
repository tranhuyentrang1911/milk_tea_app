export interface Order {
  id?: string;
  userId: string;
  date: Date;
  phone: number;
  price: number;
  note: string;
  address: string;
  payment: string;
  status: "Đang giao hàng" | "Đã hoàn thành";
  createdAt?: number;
  updatedAt?: number;
}
