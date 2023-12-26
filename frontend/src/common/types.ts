export interface book {
  id: number;
  slug: string;
  title: string;
  author: string[];
  isbn?: string;
  cover_art?: string;
  published_date?: Date;
  summary_english: string;
  summary_norwegian: string;
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
