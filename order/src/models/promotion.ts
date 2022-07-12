export interface Promotion {
  id: string;
  start: string;
  end: string;
  img: string;
  title: string;
  content: string;

  createdAt?: number;
  updatedAt?: number;
}
