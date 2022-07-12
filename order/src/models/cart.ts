export interface Cart {
  id?: string;
  name: string;
  categoryId: string;
  userId: string;
  size?: string;
  sugar?: string;
  ice?: string;
  img: string;
  note?: string;
  quantity: number;
  price: number;
}
export interface EditCart {
  id: string;
  size?: string;
  sugar?: string;
  ice?: string;
  note?: string;
  quantity?: number;
}
