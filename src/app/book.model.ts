export interface Book {
  id: string;
  title: string;
  author: string;
  pageNumber: number;
  editionDate: number;
  price: number;
  favorite?: boolean;
}
