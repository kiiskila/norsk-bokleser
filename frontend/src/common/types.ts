export interface book {
  id: number;
  slug: string;
  title: string;
  author: string[];
  isbn?: string;
  cover_art?: string;
  published_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface chapter {
  id: number;
  book_id: number;
  number: number;
  title?: string;
  body?: string;
  createdAt: Date;
  updatedAt: Date;
}
