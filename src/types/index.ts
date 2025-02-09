export type Role = 'admin' | 'reader';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isbn: string;
  publishedDate: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
}