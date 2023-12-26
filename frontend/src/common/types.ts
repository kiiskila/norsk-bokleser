export interface book {
  id: number;
  slug: string;
  title: string;
  author: string[];
  isbn?: string;
  cover_art?: string;
  published_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface chapter {
  id: number;
  book_id: number;
  number: number;
  title?: string;
  body?: string;
  created_at: Date;
  updated_at: Date;
}
