export interface Order {
  id?: string | number;
  userId: number | string;
  date: Date;
  phone: number;
  price: number;
  note: string | number;
  payment: "Trực tiếp" | "Ví điện tử" | "Thẻ ngân hàng";

  createdAt?: number;
  updatedAt?: number;
}
