export interface Product {
  id?: string;
  name: string;
  categoryId: string;
  categoryName: string;
  img: string;
  price: number;

  createdAt?: number;
  updatedAt?: number;
}
