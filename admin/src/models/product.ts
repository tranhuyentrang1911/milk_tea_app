export interface Product {
  id?: string | number;
  name: string;
  categoryId: number | string;
  categoryName: string;
  img: string;
  price: number;

  createdAt?: number;
  updatedAt?: number;
}
